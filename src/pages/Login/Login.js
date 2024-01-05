import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const required = (value) => {
    alert('This field is required!');
};

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const useremail = emailRef.current.value;
    const password = passwordRef.current.value;
    if (useremail ==='' || password === '') {
      alert('field is empty');
    }
    try {
      await axios.post("http://localhost:8080/login", {
        username, useremail, password,
      }).then(res => {
        let response = res.data;
        if (response && response.useremail) {
          //TODO for now I'm storing email and _id , but change into jsonWebToken(Security)
          localStorage.setItem("email", response.useremail)
          localStorage.setItem("_id", response._id)
          if (response?.role && response.role === 'project') {
            console.log(response)
            //TODO project dashboard once role is added to the user data 
            navigate('/project')
          } else {
            navigate('/corporate')
          }
          navigate()
        }
        else {
          alert('Login Failed !!! Please Login Again !!')
          console.log('Authentication Failed');
        }
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }
     
  return (
    <div className="login-body">
      <form onSubmit={handleSubmit} className="form">
        <div className="cut"></div>
        <div className="input-container ic1">
          <label className="login-label" htmlFor="username">Username</label>
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
          <label className="login-label" htmlFor="useremail">Email</label>
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
          <label className="login-label" htmlFor="new-password">Password</label>
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


