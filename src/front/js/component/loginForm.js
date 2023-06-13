import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const { actions } = useContext(Context);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      try {
        await actions.setUser(email, password);
        navigate("/private");
      } catch (error) {
        setError(true);
      }
      setSubmitted(true);
    }
  };
  

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          autoFocus=""
          onChange={handleEmail}
          className="form-control rounded-pill border-0 shadow-sm px-4"
        />
        <Form.Text className="text-muted">
          Nunca compartiremos tus datos personales
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
        />
      </Form.Group>
      <div className="d-grid gap-2 mt-2">
        <Button
          variant="primary"
          type="submit"
          className="btn btnRegistration text-uppercase mb-2 rounded-pill shadow-sm"
          style={{
            backgroundColor: "#A51890",
            color: "#fff",
          }}
        >
          Acceder
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;