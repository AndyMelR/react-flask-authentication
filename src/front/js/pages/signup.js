import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/signup.css";
import "../../styles/index.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);  

    const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };
 
    const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        email === "" ||
        password === ""
      ) {
        setError(true);
      } else {
        actions.setSignup(
          email,
          password
        );
        navigate("/login");
  
        setSubmitted(true);
        setError(false);
      }
    };
  
    const successMessage = () => {
      return (
        <div className="success" style={{ display: submitted ? "" : "none" }}>
          <h1>User {name} successfully registered!!</h1>
        </div>
      );
    };
  
    const errorMessage = () => {
      return (
        <div
          className="error"
          style={{
            display: error ? "" : "none",
          }}
        >
          <h1>Por favor rellene todos los campos</h1>
        </div>
      );
    };
    return (
      <>
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
  
        <div className="maincontainer">
          <div className="container-fluid">
            <div className="row no-gutter">
              <div className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-10 col-xl-7 mx-auto ">
                        <h3 className="d-flex justify-content-center">
                          Crea tu cuenta
                        </h3>
                        <p className="text-muted mb-4 d-flex justify-content-center">
                          Si ya tienes cuenta puedes acceder&nbsp;
                          <Link to="/login">
                            <a className="login " href="/login">
                              {" "}
                              aquí
                            </a>
                          </Link>{" "}
                        </p>
                        <Form>
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
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
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
                              type="button"
                              className="btnRegistration btn btn-outline-light text-uppercase mb-2 rounded-pill shadow-sm"
                              style={{
                                backgroundColor: "#A51890",
                                color: "#fff",
                              }}
                              onClick={handleSubmit}
                            >
                              Registrarme
                            </Button>
                            <Link to="/login">
                              <a
                                className="login text-align-center "
                                href="/login"
                              >
                                ¿Ya estás registrado? Accede
                              </a>
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-flex bg-image"></div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Signup;