import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import {useAppContext} from "../contexts/AppContext";
import {Link} from "react-router-dom";
import {firestore} from "../firebase";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {v4 as uuid} from "uuid";
import "./Finish.css"

function Finish() {
  const appContext = useAppContext();
  const [refId, setRefId] = useState("");

  useEffect(() => {
    if (refId === "") {
      const answer = {
        patientId: appContext.patientId,
        meal: appContext.meal,
        status: appContext.status,
        feeling: "",
        timestamp: new Date(),
      };

      const storageRef = ref(getStorage(), "feelings/" + uuid() + ".wav");
      uploadBytes(storageRef, appContext.feeling)
      .then((snapshot) => {
        answer.feeling = snapshot.ref.toString();
        console.log(["Answer", answer]);
        firestore
        .collection("answers")
        .add(answer)
        .then((docRef) => {
          setRefId(docRef.id);
        })
        .catch((error) => {
          console.error("Error adding answer: ", error);
          setRefId("-1");
        });
      })
      .catch((error) => {
        console.error("Error uploading audio: ", error);
        setRefId("-1");
      });
    }
  }, [refId]);

  return (<Container className="FinishContainer">
    <h1 className="mt-4">Hoàn thành</h1>
    <p className="mt-4">Cảm ơn bạn đã trả lời câu hỏi!</p>
    {refId === "" ? <p className="mt-4">Đang lưu câu trả lời của bạn...</p>
        : <p className="mt-4">Câu trả lời của bạn đã được lưu với
          refId là: {refId}</p>}
    <Link to="/manage/list" className="btn btn-primary">
      Quay lại danh sách bệnh nhân</Link>
  </Container>);
}

export default Finish;
