import React, { useState, useEffect } from 'react'
import axios from "axios";
function ProjectAccess() {
  const [Detail, setDetail] = useState();
  const [UniqueCompanyName, setUniqueCompanyName] = useState([]);
  const [User, setUser] = useState([]);
  



  const fetchUser = (e) => {
    const { value } = e.target;
    const filteredUsers = Detail.filter((user) => user.company_name === value);
    setUser(filteredUsers);
  }

  const fetchProject = async () => {
    try {
      const ProjectList = await axios.post("http://localhost:8081/api/fetch-project");
      setDetail(ProjectList.data);
      const uniqueNames = [...new Set(ProjectList.data.map(company => company.company_name))];
      setUniqueCompanyName(uniqueNames);
    } catch (err) {
      console.error("Error in Fetching Projects", err);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [])

  

  return (
    <>
      <form onSubmit={() => { }}>
        <div className="project-access-container">
          <label>
            <select type="text" name="company-name" onChange={fetchUser}>
              {
                UniqueCompanyName.map((companies,id) => (
                  <option key={id} value={companies}>{companies}</option>
                ))
              }
            </select>
          </label>
          <label>
            <select type="text" name="user-name">
              {User.map((user) => (
                <option key={user._id}>{ user.name} </option>
              )) }
            </select>
          </label>
          <label>
            <select type="text" name="project-name">
              { }
            </select>
          </label>
          <label>
            <select type="text" name="project-access">
              <option value={"read"} />
              <option value={"write"} />
            </select>
          </label>
          <input type="button" value="Grant Access" />
        </div>

      </form>
    </>
  )
}

export default ProjectAccess