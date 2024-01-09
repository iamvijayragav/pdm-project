import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const required = (value) => {
  alert("This field is required!");
};

const Login = () => {
  const navigate = useNavigate();  // Use useNavigate hook instead of useHistory
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const useremail = emailRef.current.value;
    const password = passwordRef.current.value;

    if (useremail === "" || password === "") {
      alert("Fields are empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/login", {
        username,
        useremail,
        password,
      });

      let response = res.data;

      if (response && response.useremail) {
        localStorage.setItem("email", response.useremail);
        localStorage.setItem("_id", response._id);

        if (response?.role && response.role === "project") {
          navigate("/project");
        } else {
          navigate("/corporate");
        }
      } else {
        alert("Login Failed !!! Please Login Again !!");
        console.log("Authentication Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
     
  return (
    <div className="login-body">
      <form onSubmit={handleSubmit} className="form">
        <div className="cut"></div>
        <div className="input-container ic1">
          <label className="login-label">Username</label>
          <input
            type="text"
            className="input"
            name="username"
            autoComplete="username"
            ref={usernameRef}
            validations={[required]}
          />
        </div>

        <div className="input-container ic2">
          <label className="login-label" >Email</label>
          <input
            type="email"
            className="input"
            name="useremail"
            ref={emailRef}
            autoComplete="useremail"
            validations={[required]}
          />
        </div>

        <div className="input-container ic2">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            autoComplete="new-password"
            ref={passwordRef}
            validations={[required]}
          />
        </div>

          <button type="submit" className="submit" onClick={handleSubmit}>
            Login
          </button>
      </form>
    </div>
  );
};

export default Login;


