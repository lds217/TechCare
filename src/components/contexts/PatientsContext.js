import React, {createContext, useContext, useEffect, useState} from "react";
import {firestore} from "../firebase";

const PatientsContext = createContext();

export function usePatientsContext() {
  return useContext(PatientsContext);
}

export function PatientsContextProvider({children}) {
  const [patients, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      const patientsCollection = await firestore.collection("patients").get();

      const patientsData = patientsCollection.docs.map((doc) => {
        const patientData = doc.data();
        const isActive = patientData.inactive !== undefined
            ? !patientData.inactive : true;

        return {
          id: doc.id, ...patientData, inactive: !isActive,
        };
      });

      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching patients: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPatient = async (newPatientData) => {
    try {
      const docRef = await firestore.collection("patients").add(newPatientData);

      setPatients((prevPatients) => [...prevPatients,
        {id: docRef.id, ...newPatientData},]);
    } catch (error) {
      console.error("Error adding patient: ", error);
    }
  };

  const editPatient = async (patientId, updatedPatientData) => {
    try {
      console.log(JSON.stringify(["updatedPatientData", updatedPatientData]));

      await firestore.collection("patients").doc(patientId).update(
          updatedPatientData);

      setPatients((prevPatients) => prevPatients
      .map((patient) => patient.id === patientId
          ? {...patient, ...updatedPatientData} : patient));
    } catch (error) {
      console.error("Error editing patient: ", error);
    }
  };

  const markPatientAsInactive = async (patientId) => {
    try {
      await firestore.collection("patients")
      .doc(patientId)
      .update({inactive: true});

      setPatients((prevPatients) => prevPatients.filter(
          (patient) => patient.id !== patientId));
    } catch (error) {
      console.error("Error marking patient as inactive: ", error);
    }
  };

  const removePatient = (patientId) => {
    markPatientAsInactive(patientId);
  };

  return (<PatientsContext.Provider
      value={{patients, addPatient, editPatient, removePatient}}>
    {children}
  </PatientsContext.Provider>);
}
