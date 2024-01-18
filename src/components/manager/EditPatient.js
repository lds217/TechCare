import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import {usePatientsContext} from "../contexts/PatientsContext";
import PatientForm from "../others/PatientForm";
import {useAppContext} from "../contexts/AppContext";
import "./EditPatient.css"

function EditPatient() {
  const {patientId} = useAppContext();
  const {patients, editPatient} = usePatientsContext();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    bedId: "",
    name: "",
    birthdate: "",
  });

  useEffect(() => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setInitialValues({
        bedId: patient.bedId,
        name: patient.name,
        birthdate: patient.birthdate,
      });
    }
  }, [patientId, patients]);

  const handleEditPatient = (updatedPatient) => {
    editPatient(patientId, updatedPatient);
    navigate(-1);
  };

  return (
      <Container className="EditPatient-container">
        <h1 className="mt-4">Sửa thông tin bệnh nhân</h1>
        <PatientForm initialValues={initialValues}
                     onSubmit={handleEditPatient}/>
        <Button className="mt-3 btn btn-secondary" onClick={() => {
          navigate(-1)
        }}>
          Quay lại
        </Button>
      </Container>
  );
}

export default EditPatient;
