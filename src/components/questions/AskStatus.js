import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import QuestionHeader from "../others/QuestionHeader";
import "./AskStatus.css"


const StatusOptions = [
  "Đau đầu",
  "Chóng mặt",
  "Buồn nôn",
  "Chán ăn",
  "Sốt",
  "Buồn ngủ",
  "Nhức người",
  "Thèm ăn",
  "Khác",
];

function AskStatus() {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const appContext = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (appContext.status) {
      setSelectedStatus(appContext.status);
    }
  }, [appContext.status]);

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedStatus((prevSelectedStatus) => {
      if (prevSelectedStatus.includes(value)) {
        return prevSelectedStatus.filter((status) => status !== value);
      } else {
        return [...prevSelectedStatus, value];
      }
    });
  };

  const handleNextClick = () => {
    appContext.setStatus(selectedStatus);
  };

  return (
      <Container className="StatusContainer">
         <Link to="/pages/emergency" className="btn btn-primary">Gọi y tá</Link>
        <QuestionHeader></QuestionHeader>
        <Row className="mt-4">
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Chọn các trạng thái hiện tại của bạn:</Form.Label>
                <table className="StatusTable">
                  <tbody>
                  {StatusOptions.map((status, index) => (
                      <React.Fragment key={index}>
                        {index % 3 === 0 && <tr/>}
                        <td>
                          <Form.Check className="Status"
                              key={index}
                              type="checkbox"
                              label={status}
                              value={status}
                              onChange={handleStatusChange}
                              checked={selectedStatus.includes(status)}
                          />
                        </td>
                      </React.Fragment>
                  ))}
                  </tbody>
                </table>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="secondary" onClick={() => {
              navigate(-1);
            }}>
              Quay về
            </Button>
          </Col>
          <Col>
            <Link to="/ask/feeling">
              <Button variant="primary" disabled={selectedStatus.length === 0}
                      onClick={handleNextClick}>
                Tiếp theo
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
  );
}

export default AskStatus;