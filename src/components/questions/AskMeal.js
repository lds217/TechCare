import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate,Link} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import QuestionHeader from "../others/QuestionHeader";
import "./AskMeal.css"

function AskMeal() {
  const [selectedMeal, setSelectedMeal] = useState("");
  const appContext = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (appContext.meal) {
      setSelectedMeal(appContext.meal);
    }
  }, [appContext.meal]);

  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
  };

  const handleNextClick = () => {
    appContext.setMeal(selectedMeal);

    navigate("/ask/status");
  };

  const handleGoBack = () => {
    navigate(-1)
  };

  return (
      <Container className="Infor-container">
         <Link to="/pages/emergency" className="btn btn-primary">Gọi y tá</Link>
        <QuestionHeader></QuestionHeader>
        <Row className="mt-4">
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Bạn đã ăn bao nhiêu bữa một ngày?</Form.Label>
                <div className="Meals">
                <div className="Meals-1">
                <Form.Check
                  label="1 bữa"
                    type="radio"
                    
                    name="mealCount"
                    value="1"
                    onChange={handleMealChange}
                    checked={selectedMeal === "1"}
                    className="one-meal"
                />
                <br></br>
                <Form.Check
                    type="radio"
                    label="2 bữa"
                    name="mealCount"
                    value="2"
                    onChange={handleMealChange}
                    checked={selectedMeal === "2"}
                    className="two-meal"
                />
                <br></br>
                </div>
                <div className="Meals-2">
                <Form.Check
                    type="radio"
                    label="3 bữa"
                    name="mealCount"
                    value="3"
                    onChange={handleMealChange}
                    checked={selectedMeal === "3"}
                    className="three-meal"
                />
                <br></br>
                <Form.Check
                    type="radio"
                    label="Trên 3 bữa"
                    name="mealCount"
                    value="4"
                    onChange={handleMealChange}
                    checked={selectedMeal === "4"}
                    className="four-meal"
                />
                </div>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="secondary" onClick={handleGoBack}>
              Trở lại
            </Button>
            <Button variant="primary" disabled={!selectedMeal}
                    onClick={handleNextClick}>
              Tiếp theo
            </Button>
          </Col>
        </Row>
      </Container>
  );
}

export default AskMeal;
