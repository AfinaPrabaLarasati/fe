import React, { useRef, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style/All.css";
import { useSnackbar } from "notistack";

export default function Register() {
  const navigate = useNavigate();
  const nameField = useRef("");
  const emailField = useRef("");
  const roleField = useRef("");
  const roomField = useRef("");
  const passwordField = useRef("");
  const { enqueueSnackbar } = useSnackbar();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      const userToRegisterPayload = {
        name: nameField.current.value,
        email: emailField.current.value,
        role: roleField.current.value,
        room: roomField.current.value,
        password: passwordField.current.value,
      };
      const token = localStorage.getItem("token");

      const registerRequest = await axios.post(
        "http://localhost:1010/auth/registerUser",
        userToRegisterPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const registerResponse = registerRequest.data;
      console.log(registerRequest);

      if (registerResponse.status) {
        navigate("/users")
        enqueueSnackbar(`${registerResponse.message} `, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  return (
    <div className="register-box">
      <h2 className="fw-bold">Sign Up</h2>

      <form onSubmit={onRegister}>
        <div className="signup-box" style={{display: "none"}}>
          <input
            type="text"
            ref={roleField}
            // style={buttonBorder}
            value="penghuni"
          />
          <label>Role</label>
        </div>

        <div className="signup-box">
          <input type="text" ref={nameField} required />
          <label>Name</label>
        </div>

        <div className="signup-box">
          <input type="text" ref={emailField} required />
          <label>Email</label>
        </div>

        <div className="signup-box">
          <input type="password" ref={passwordField} required />
          <label>Password</label>
        </div>

        <div className="signup-box">
          <input type="text" ref={roomField} required />
          <label>Room</label>
        </div>

        <p className="text-secondary"></p>
        {errorResponse.isError && (
          <Alert variant="danger">{errorResponse.message}</Alert>
        )}
        <div className="d-flex " style={{justifyContent: "space-between"}}>
          <Button className="button-submit" type="submit">
            Sign up
          </Button>
          <Link to='/users' className="button-submit" type="submit" style={{textDecoration: "none" }}>
            Penghuni
          </Link>
        </div>
      </form>
    </div>
  );
}
