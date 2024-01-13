import React, { useState, useEffect } from 'react'
import axios from "axios";
function ProjectAccess() {
  const [Detail, setDetail] = useState();
  const [UniqueCompanyName, setUniqueCompanyName] = useState([]);
  const [User, setUser] = useState([]);
  const [Project, setProject] = useState([]);

  

  const HandleSubmit = () => {
    return 0;
  };

  const fetchProject = async () => {
    try {
      const ProjectList = await axios.post("http://localhost:8081/api/fetch-project")
      setProject(ProjectList.data);
    }
    catch (err) {
      console.error("Error in fethcing Projects");
    }
  }

  const fetchUser = (e) => {
    const { value } = e.target;
    const filteredUsers = Detail.filter((user) => user.company_name === value);
    setUser(filteredUsers);
  }

  const fetchCompany = async () => {
    try {
      const CompanyList = await axios.post("http://localhost:8081/api/fetch-user");
      setDetail(CompanyList.data);
      const uniqueNames = [...new Set(CompanyList.data.map(company => company.company_name))];
      setUniqueCompanyName(uniqueNames);
    } catch (err) {
      console.error("Error in Fetching Users", err);
    }
  }

  useEffect(() => {
    fetchCompany();
    fetchProject();
  }, [])

  

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <div className="project-access-container">
          <label>
            <select type="text" name="company-name" onChange={fetchUser} defaultValue="select">
            <option value="select" disabled>Select Company</option>
              {
                UniqueCompanyName.map((companies, id) => (
                  <option key={id} value={companies}>{companies}</option>
                ))
              }
            </select>
          </label>
          <label>
            <select type="text" name="user-name" defaultValue="select">
            <option value="select" disabled>Select User</option>
              {User.map((user) => (
                <option key={user._id}>{user.name} </option>
              )) }
            </select>
          </label>
          <label>
            <select type="text" name="project-name" defaultValue="select">
            <option value="select" disabled>Select Project</option>
              {Project.map((project) => (
                <option key={ project._id}> { project.projectname}</option>
              ))}
            </select>
          </label>
          <label>
            <select type="text" name="project-access" defaultValue="select">
            <option value="select" disabled>Select</option>
              <option value="read">read</option>
              <option value="write">write</option> 
            </select>
          </label>
          <input type="button" value="Grant Access" />
        </div>

      </form>
    </>
  )
}

export default ProjectAccess