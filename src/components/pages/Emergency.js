import "./Home.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import {usePatientsContext} from "../contexts/PatientsContext";
import {useAppContext} from "../contexts/AppContext";
import QuestionHeader from "../others/QuestionHeader";
import {useNavigate} from "react-router-dom";

function Home() {
  const {patientId, setPatientId, resetAppContext} = useAppContext();
  const {patients} = usePatientsContext();
  const patient = patients.find((p) => p.id === patientId);
  const navigate = useNavigate();
  return (
      <Container className="Homepage">
        <div className="Homepage-content">
        <h1 className="mt-4">Đã gọi y tá</h1>
        <QuestionHeader></QuestionHeader>
        <br></br>
        <Col>
            <p><strong>Mã bệnh nhân:</strong> {patient.id}</p>
            <p><strong>Họ và tên:</strong> {patient.name}</p>
            <p><strong>Ngày tháng năm sinh:</strong> {patient.birthdate}</p>
          </Col>
        </div>
        <Button onClick={() => {
              navigate(-1);
            }}>
              Quay về
        </Button>
      </Container>
  );
}

export default Home;
