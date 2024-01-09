import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Deligation from "../../components/Functions/Deligation";
import ProjectAccess from "../../components/Functions/ProjectAccess";
import AddProject from "../../components/Functions/AddProject";
import Update from "../../components/Functions/Update";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Corporate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApi() {
      const email = localStorage.getItem('email')
      const _id = localStorage.getItem('_id')
      setIsLoading(true)
      await axios.post('http://localhost:8081/verify', {_id,currRole:'corporate' })
        .then(
          res => {
            console.log(res)
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
    fetchApi();
  },[])

  const logout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('_id')
    navigate('/');
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      {isValidUser && <div>
        <AddProject />
        <Deligation />
        <ProjectAccess />
        <Update />
      </div >}
    </div>

  );

}

export default Corporate;