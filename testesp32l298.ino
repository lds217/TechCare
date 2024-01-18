#include <ESP32Servo.h>          //standard library for the servo
#include <NewPing.h> 

int s1 = 32; 
int s2 = 35;
int s3 = 34;
int s4 = 39;
int s5 = 36;

#define trig_pin 5 //
#define echo_pin 18 //

const int LeftMotorForward = 14;
const int LeftMotorBackward = 27;
const int RightMotorForward = 26;
const int RightMotorBackward = 25;

#define maximum_distance 200
boolean goesForward = false;
int distance = 100;

int giatri1, giatri2, giatri3, giatri4, giatri5;
Servo arm1,arm2,arm3;

NewPing sonar(trig_pin, echo_pin, maximum_distance); //sensor function
Servo servo_motor;

///////////////////////FIREBASE//////////////////////////


#include <Arduino.h>
#if defined(ESP32) || defined(ARDUINO_RASPBERRY_PI_PICO_W)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#elif __has_include(<WiFiNINA.h>)
#include <WiFiNINA.h>
#elif __has_include(<WiFi101.h>)
#include <WiFi101.h>
#elif __has_include(<WiFiS3.h>)
#include <WiFiS3.h>
#endif

#include <Firebase_ESP_Client.h>

#include <addons/TokenHelper.h>

#include <addons/RTDBHelper.h>

#define WIFI_SSID "Techcare"
#define WIFI_PASSWORD "12345778"

#define API_KEY ""
#define DATABASE_URL "" 
#define FIREBASE_PROJECT_ID ""

#define USER_EMAIL ""
#define USER_PASSWORD ""


FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

unsigned long count = 0;

#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
WiFiMulti multi;
#endif

void setup(){
  pinMode(LeftMotorForward, OUTPUT);
  pinMode(LeftMotorBackward, OUTPUT);
  pinMode(RightMotorForward, OUTPUT);
  pinMode(RightMotorBackward, OUTPUT);

  servo_motor.attach(4); //our servo pin
  servo_motor.write(100);
  delay(2000);
  distance = readPing();
  delay(100);
  distance = readPing();
  delay(100);
  distance = readPing();
  delay(100);
  distance = readPing();
  delay(100);
  
  Serial.begin(115200);
  #if defined(ARDUINO_RASPBERRY_PI_PICO_W)
  multi.addAP(WIFI_SSID, WIFI_PASSWORD);
  multi.run();
#else
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
#endif

  Serial.print("Connecting to Wi-Fi");
  unsigned long ms = millis();
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
    if (millis() - ms > 10000)
      break;
#endif
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;

  config.token_status_callback = tokenStatusCallback;

  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096 , 1024 );
  fbdo.setResponseSize(2048);

  Firebase.begin(&config, &auth);


#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
  config.wifi.clearAP();
  config.wifi.addAP(WIFI_SSID, WIFI_PASSWORD);
#endif

  Firebase.setDoubleDigits(5);

  config.timeout.serverResponse = 10 * 1000;

}


bool ManualControl=0,Activated=1; 
String Route="";

void firestoreDataGet(String mask){
    String documentPath = "control/value";

    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), mask.c_str()))
    {
            Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
            FirebaseJson json;
            FirebaseJsonData jsonData;

            json.setJsonData(fbdo.payload());

            json.get(jsonData, "fields/" + mask + "/booleanValue");
            String ans=jsonData.stringValue;
            Serial.println(ans);
            if(mask=="ManualControl")
              ManualControl=(ans=="true"?1:0);
            else
              if(mask=="Activated")
                Activated=(ans=="true"?1:0);

    }
        else
            Serial.println(fbdo.errorReason());
}
 String dir;
void firestoreDataGetDir(){
    String documentPath = "control/value";
    String mask="ManualDirection";

    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), mask.c_str()))
    {
            Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
            FirebaseJson json;
            FirebaseJsonData jsonData;

            json.setJsonData(fbdo.payload());

            json.get(jsonData, "fields/ManualDirection/stringValue");
            
            dir=jsonData.stringValue;
    }
        else
            Serial.println(fbdo.errorReason());
}

void firestoreDataUpdateDir(String Status){
  if(WiFi.status() == WL_CONNECTED && Firebase.ready()){
    String documentPath = "control/value";
    FirebaseJson content;
    content.set("fields/ManualDirection/stringValue", Status);
    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "ManualDirection")){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }

    if(Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw())){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }
  }
}

void firestoreDataGetRoute(){
    String documentPath = "control/value";
    String mask="Route";

    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), mask.c_str()))
    {
            Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
            FirebaseJson json;
            FirebaseJsonData jsonData;
            json.setJsonData(fbdo.payload());
            json.get(jsonData, "fields/Route/stringValue");
            Route=jsonData.stringValue;
    }
    else
        Serial.println(fbdo.errorReason());
}

void firestoreDataUpdateActivated(bool Status){
  if(WiFi.status() == WL_CONNECTED && Firebase.ready()){
    String documentPath = "control/value";
    FirebaseJson content;
    content.set("fields/Activated/booleanValue", Status);
    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "Activated")){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }

    if(Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw())){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }
  }
}



void firestoreDataUpdateCheck(bool Value){
  if(WiFi.status() == WL_CONNECTED && Firebase.ready()){
    String documentPath = "check/value";
    FirebaseJson content;
    content.set("fields/checking/booleanValue", Value);
    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "checking")){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }

    if(Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw())){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }
  }
}




int cnt=0;
void loop(){

delay(500);
    firestoreDataGet("ManualControl");
    firestoreDataGet("Activated");


  if(ManualControl==0&&Activated==1)
  {
    int distanceRight = 0;
    int distanceLeft = 0;
    Serial.println(distance);
    if (distance <= 40)// || gthongngoai==1)
    { 
      moveStop();
      delay(300);
      moveBackward();
      delay(300);
      moveStop();
      delay(300);
      distanceRight = lookRight();
      delay(300);
      distanceLeft = lookLeft();
      delay(300);
  
      if (distance >= distanceLeft){
  
        turnRight(250);
        delay(300);
        moveForward();
        delay(4000);
        turnLeft(750);
        moveForward();
        delay(4000);
        turnRight(300);
        moveStop();
      }
      else{
        turnLeft(250);
        delay(300);
        moveForward();
        delay(4000);
        turnRight(750);
        moveForward();
        delay(4000);
        turnLeft(300);
        moveStop();
      }
    }
    moveForward();
    distance = readPing();
  }
  else
  {
    if(Activated)
    {
      if(Activated==1&&ManualControl==1)
      {
          firestoreDataGetDir();
          if(dir=="L")
          {
            moveStop();
            turnLeft(10);
        
          }
          if(dir=="R")
          {
            moveStop();
            turnRight(10);

          }
          if(dir=="F")
          {
            moveForward();
          }
          if(dir=="S")
          {
            moveStop();
            firestoreDataUpdateActivated(0);
          }
          
      }
    }
    else
      moveStop();
  }

} 

int lookRight(){  
  servo_motor.write(50);
  delay(300);
  int distance = readPing();
  delay(100);
  servo_motor.write(90);
  return distance;
}
 
int lookLeft(){
  servo_motor.write(130);
  delay(300);
  int distance = readPing();
  delay(100);
  servo_motor.write(90);
  return distance;
  delay(100);
}
 
int readPing(){
  delay(70);
  int cm = sonar.ping_cm();
  if (cm==0){
    cm=250;
  }
  return cm;
}

void moveStop(){
  digitalWrite(RightMotorForward, LOW);
  digitalWrite(LeftMotorForward, LOW);
  digitalWrite(RightMotorBackward, LOW);
  digitalWrite(LeftMotorBackward, LOW);
}
 
void moveBackward(){
 
  if(!goesForward){
 
    goesForward=true;
 
    digitalWrite(LeftMotorForward, LOW);
    digitalWrite(RightMotorForward, LOW);
 
    digitalWrite(LeftMotorBackward, HIGH);
    digitalWrite(RightMotorBackward, HIGH); 
  }
}

void moveForward(){
 
  goesForward=false;
 
  digitalWrite(LeftMotorBackward, LOW);
  digitalWrite(RightMotorBackward, LOW);
 
  digitalWrite(LeftMotorForward, HIGH);
  digitalWrite(RightMotorForward, HIGH);
 
}

void turnRight(int x){
 
  digitalWrite(LeftMotorForward, HIGH);
  digitalWrite(RightMotorBackward, HIGH);
 
  digitalWrite(LeftMotorBackward, LOW);
  digitalWrite(RightMotorForward, LOW);
 
  delay(x);
}
 
void turnLeft(int x){
 
  digitalWrite(LeftMotorBackward, HIGH);
  digitalWrite(RightMotorForward, HIGH);
 
  digitalWrite(LeftMotorForward, LOW);
  digitalWrite(RightMotorBackward, LOW);
 
  delay(x);
 
}


