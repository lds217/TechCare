import React from "react";
import { Row, Col } from "react-bootstrap";
import {usePatientsContext} from "../contexts/PatientsContext";
import {useAppContext} from "../contexts/AppContext";

function QuestionHeader() {
  const { patients } = usePatientsContext();
  const { patientId } = useAppContext();
  const patient = patients.find((p) => p.id === patientId);

  return (
      <Row className="mt-3">
        <Col xs={1}>
          <i className="bi bi-person"></i>
        </Col>
        <Col>
          <h4>Giường bệnh số {patient.bedId}</h4>
        </Col>
      </Row>
  );
}

export default QuestionHeader;
