import React, { useContext, useState,useNavigate } from "react";
import "../../styles/home.css";
import "../../styles/login.css";
import "../../styles/index.css";

import LoginForm from "../component/loginForm";

const Login = () => {
  return (
    <>
      <div className="messages">
    
      </div>
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image"></div>
            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto ">
                      <h3 className="d-flex justify-content-center">Login</h3>
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;