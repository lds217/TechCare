import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link,useNavigate} from "react-router-dom";
import {usePatientsContext} from "../contexts/PatientsContext";
import {useAppContext} from "../contexts/AppContext";
import "./ConfirmInfo.css"
import {useEffect} from 'react';
import QuestionHeader from "../others/QuestionHeader";
function ConfirmInfo() {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const {patientId, setPatientId, resetAppContext} = useAppContext();
  const {patients} = usePatientsContext();
  const patient = patients.find((p) => p.id === patientId);

  const handleConfirm = () => {
    setConfirmed(true);
    resetAppContext();
    setPatientId(patientId);
    navigate("/ask/medicine");
  };

  const handleEdit = () => {
    navigate("/manage/edit");
  };

  return (
    
      <Container className="Information-container">
        <Link to="/pages/emergency" className="btn btn-primary">Gọi y tá</Link>
        <div className="Infor">
        <Row className="mt-3">
          <Col xs={1}>
            <i className="bi bi-person"></i>
          </Col>
          <Col>
            <QuestionHeader></QuestionHeader>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p><strong>Mã bệnh nhân:</strong> {patient.id}</p>
            <p><strong>Họ và tên:</strong> {patient.name}</p>
            <p><strong>Ngày tháng năm sinh:</strong> {patient.birthdate}</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {confirmed ? (
                <Button variant="success" onClick={handleEdit}>
                  Chỉnh sửa thông tin
                </Button>
            ) : (
                <>
                  <Button variant="success" className="mr-2"
                          onClick={handleConfirm}>
                    Xác nhận đúng
                  </Button>
                  <Button variant="danger" onClick={handleEdit}>
                    Chỉnh sửa thông tin
                  </Button>
                </>
            )}
          </Col>
        </Row>
        </div>
      </Container>
  );
}

export default ConfirmInfo;