import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">My World</span>
        </Link>
        <div className="ml-auto">
          <Link to="/signup">
            <button
              className="btn m-2"
              style={{
                backgroundColor: "#A51890",
                color: "#fff",
              }}
            >
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button
              className="btn m-2"
              style={{
                backgroundColor: "#A51890",
                color: "#fff",
              }}
              onClick={() => actions.logout()}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
