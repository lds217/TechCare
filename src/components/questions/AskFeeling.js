import React, {useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate,Link} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import QuestionHeader from "../others/QuestionHeader";
import "./AskFeeling.css"

function AskFeeling() {
  
  const navigate = useNavigate();
  const appContext = useAppContext();
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {type: "audio/wav"});
        setAudioBlob(blob);
        setIsRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Không thể truy cập thiết bị ghi âm: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const startPlaying = () => {
    if (audioBlob) {
      audioRef.current.src = URL.createObjectURL(audioBlob);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopPlaying = () => {
    if (audioBlob) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  const handleNextClick = () => {
    appContext.setFeeling(audioBlob);

    navigate("/ask/finish");
  };

  return (
      <Container className="Feelings">
        <Link to="/pages/emergency" className="btn btn-primary">Gọi y tá</Link>
        <QuestionHeader></QuestionHeader>
        <Row className="mt-4">
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Hôm nay bạn cảm thấy thế nào?</Form.Label>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {isRecording ? (
                <Button variant="danger" onClick={stopRecording}>
                  Dừng ghi âm
                </Button>
            ) : (
                <Button variant="primary" onClick={startRecording}>
                  Bắt đầu ghi âm
                </Button>
            )}
          </Col>
          <Col>
            {isPlaying ? (
                <Button variant="danger" onClick={stopPlaying}>
                  Dừng phát
                </Button>
            ) : (
                <Button variant="success" onClick={startPlaying}>
                  Phát lại
                </Button>
            )}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="secondary" onClick={() => {
              navigate(-1)
            }}>
              Quay về
            </Button>
            <Button variant="primary" onClick={handleNextClick}>
              Tiếp theo
            </Button>
          </Col>
        </Row>
        <audio ref={audioRef}></audio>
      </Container>
  );
}

export default AskFeeling;
