import { React, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PackageData from "../../components/PackageData/PackageData";
const Project = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [IsValidUser, setIsValidUser] = useState(false);

  const navigate = useNavigate();


  async function fetchApi() {
    const email = localStorage.getItem('email')
    const _id = localStorage.getItem('_id')
    setIsLoading(true);

    await axios.post('http://localhost:8081/verify', { email, _id, currRole: "project" })
      .then(
        res => {
          if (res && res.data.validUser) {
            setIsValidUser(true)
          } else {
            navigate('/')
          }
        }
      ).catch(err => {
        console.log(err)
        setIsValidUser(false);
        setIsLoading(false);
        navigate('/')
      })
  };

  useEffect(() => {
    fetchApi();
  });

  const logout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('_id')
    navigate('/');
  }

  return (
    <>
      <button onClick={logout}>logout</button>
      <div className="project-container">
        <Sidebar />
      </div>
    </>

  );

}

export default Project;