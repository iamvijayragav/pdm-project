import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectAccess() {
  const [Detail, setDetail] = useState([]);
  const [UniqueCompanyName, setUniqueCompanyName] = useState([]);
  const [User, setUser] = useState([]);
  const [Project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    userName: '',
    projectName: '',
    projectAccess: '',
  });

  const HandleSubmit = () => {
    console.log('Submitted Data:', formData);
      };

  const fetchProject = async () => {
    try {
      const ProjectList = await axios.post("http://localhost:8081/api/fetch-project");
      setProject(ProjectList.data);
    } catch (err) {
      console.error("Error in fetching Projects");
    }
  };

  const fetchUser = (e) => {
    const { value } = e.target;
    const filteredUsers = Detail.filter((user) => user.company_name === value);
    setUser(filteredUsers);

    // * Clear selected user and project when company changes
    setFormData(prevData => ({
      ...prevData,
      userName: '',
      projectName: '',
    }));
  };

  // * fetching companies
  const fetchCompany = async () => {
    try {
      const CompanyList = await axios.post("http://localhost:8081/api/fetch-user");
      setDetail(CompanyList.data);
      const uniqueNames = [...new Set(CompanyList.data.map(company => company.company_name))];
      setUniqueCompanyName(uniqueNames);
    } catch (err) {
      console.error("Error in Fetching Users", err);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchProject();
  }, []);

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        HandleSubmit();
      }}>
        <div className="project-access-container">
          <label>
            <select
              type="text"
              name="company-name"
              onChange={(e) => {
                fetchUser(e);
                setFormData(prevData => ({
                  ...prevData,
                  companyName: e.target.value,
                }));
              }}
              value={formData.companyName}
              required
            >
              <option value="" disabled>Select Company</option>
              {UniqueCompanyName.map((companies, id) => (
                <option key={id} value={companies}>{companies}</option>
              ))}
            </select>
          </label>
          <label>
            <select
              type="text"
              name="user-name"
              onChange={(e) => {
                setFormData(prevData => ({
                  ...prevData,
                  userName: e.target.value,
                }));
              }}
              value={formData.userName}
              required
            >
              <option value="" disabled>Select User</option>
              {User.map((user) => (
                <option key={user._id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </label>
          <label>
            <select
              type="text"
              name="project-name"
              onChange={(e) => {
                setFormData(prevData => ({
                  ...prevData,
                  projectName: e.target.value,
                }));
              }}
              value={formData.projectName}
              required
            >
              <option value="" disabled>Select Project</option>
              {Project.map((project) => (
                <option key={project._id} value={project.projectname}>{project.projectname}</option>
              ))}
            </select>
          </label>
          <label>
            <select
              type="text"
              name="project-access"
              onChange={(e) => {
                setFormData(prevData => ({
                  ...prevData,
                  projectAccess: e.target.value,
                }));
              }}
              value={formData.projectAccess}
              required
            >
              <option value="" disabled>Select Project Access</option>
              <option value="read">read</option>
              <option value="write">write</option>
            </select>
          </label>
          <input type="submit" value="Grant Access" />
        </div>
      </form>
    </>
  );
}

export default ProjectAccess;