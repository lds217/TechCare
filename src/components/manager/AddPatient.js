import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import {usePatientsContext} from "../contexts/PatientsContext";
import PatientForm from "../others/PatientForm";

function AddPatient() {
  const {addPatient} = usePatientsContext();
  const navigate = useNavigate();

  const handleAddPatient = (patient) => {
    addPatient(patient);
    navigate(-1);
  };

  return (
      <Container>
        <h1 className="mt-4">Thêm bệnh nhân</h1>
        <PatientForm initialValues={{bedId: "", name: "", birthdate: ""}}
                     onSubmit={handleAddPatient}/>
        <Button className="mt-3 btn btn-secondary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Container>
  );
}

export default AddPatient;
