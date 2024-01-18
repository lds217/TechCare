import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {usePatientsContext} from "../contexts/PatientsContext";
import {useAppContext} from "../contexts/AppContext";
import "./ListPatient.css"
import logo from '../others/face.gif'
function ListPatient() {
  const {patients, removePatient} = usePatientsContext();
  const navigate = useNavigate();
  const {setPatientId} = useAppContext();

  return (<Container className="ListPatient">
        <h1 className="mt-4">Danh sách bệnh nhân</h1>
        <Table striped bordered hover responsive className="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Giường bệnh số</th>
            <th>Họ và tên</th>
            <th>Ngày tháng năm sinh</th>
            <th>Thao tác</th>
          </tr>
          </thead>
          <tbody>
          {patients.map((patient, index) => (<tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.bedId}</td>
                <td>{patient.name}</td>
                <td>{patient.birthdate}</td>
                <td>
                  <ButtonGroup>
                    <Button
                        className="btn btn-primary"
                        onClick={() => {
                          setPatientId(patient.id);
                          navigate("/manage/edit");
                        }}
                    >
                      Sửa
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => removePatient(patient.id)}
                    >
                      Xoá
                    </Button>
                    <Button className="btn btn-success" onClick={() => {
                      setPatientId(patient.id);
                      <img src={logo} />
                      navigate("/ask/confirm")
                    }}>
                      Bắt đầu khám
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>))}
          </tbody>
        </Table>
        <Link to="/manage/add" className="btn btn-success mt-3">
          Thêm bệnh nhân
        </Link>
      </Container>);
}

export default ListPatient;
