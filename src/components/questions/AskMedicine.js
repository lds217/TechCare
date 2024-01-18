import React, { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./AskMedicine.css";
import logo from "../others/face.gif";
function AskMedicine() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      //window.location.replace("/ask-meal");
      navigate("/ask/meal");
    }, 15000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
      <div className="container1">
         <Link to="/pages/emergency" className="btn btn-primary">Gọi y tá</Link>
        <h1 >Đang bốc thuốc...</h1>
        <img src={logo} />
      </div>
  );
}

export default AskMedicine;
