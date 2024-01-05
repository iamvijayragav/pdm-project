import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Deligation from "../../components/Functions/Deligation";
import ProjectAccess from "../../components/Functions/ProjectAccess";
import AddProjects from "../../components/Functions/AddProjects";
import Update from "../../components/Functions/Update";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CorporateDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApi() {
      const email = localStorage.getItem('email')
      const _id = localStorage.getItem('_id')
      setIsLoading(true)
      await axios.post('http://localhost:8080/verify', { email, _id,currRole:'corporate' })
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
      {isValidUser && <div>
        <Sidebar />
        <AddProjects />
        <Deligation />
        <ProjectAccess />
        <Update />
      </div >}
    </div>

  );

}

export default CorporateDashboard;