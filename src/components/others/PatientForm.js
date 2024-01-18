import React, {useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";

function PatientForm({initialValues, onSubmit}) {
  const [patient, setPatient] = useState({
    bedId: "",
    name:"",
    birthdate:"",
  });

  useEffect(() => {
    setPatient({
      bedId: initialValues.bedId || "",
      name: initialValues.name || "",
      birthdate: initialValues.birthdate || "",
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(patient);
  };

  return (
      <Form>
        <Form.Group controlId="bedId">
          <Form.Label>Mã giường bệnh:</Form.Label>
          <Form.Control
              type="text"
              name="bedId"
              value={patient.bedId}
              onChange={handleChange}
              placeholder="Nhập số giường bệnh"
              required
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Họ và tên:</Form.Label>
          <Form.Control
              type="text"
              name="name"
              value={patient.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              required
          />
        </Form.Group>

        <Form.Group controlId="birthdate">
          <Form.Label>Ngày tháng năm sinh:</Form.Label>
          <Form.Control
              type="date"
              name="birthdate"
              value={patient.birthdate}
              onChange={handleChange}
              required
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
          Lưu
        </Button>
      </Form>
  );
}

export default PatientForm;
