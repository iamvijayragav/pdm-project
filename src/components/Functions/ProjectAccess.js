import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectAccess = () => {
  const [Detail, setDetail] = useState([]);
  const [UniqueCompanyName, setUniqueCompanyName] = useState([]);
  const [User, setUser] = useState([]);
  const [Project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    userId: '',
    projectCode: '',
    Access: '',
  });

  const HandleSubmit = async () => {
    
    try {
      const Result =await axios.post("http://localhost:8081/api/upload-access",formData);
      alert("Success.")
    } catch (err) {
      console.error("Error in Submitting Data.");
      alert("Error in Submitting Data");
    }
  }
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
      projectCode: '',
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
                  userId: e.target.value,
                }));
              }}
              value={formData.userId}
              required
            >
              <option value="" disabled>Select User</option>
              {User.map((user) => (
                <option key={user._id} value={user.user_id}>{user.user_id}</option>
              ))}
            </select>
          </label>
          <label>
            <select
              type="text"
              name="project-code"
              onChange={(e) => {
                setFormData(prevData => ({
                  ...prevData,
                  projectCode: e.target.value,
                }));
              }}
              value={formData.projectCode}
              required
            >
              <option value="" disabled>Select Project</option>
              {Project.map((project) => (
                <option key={project._id} value={project.project_code}>{project.project_code}</option>
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
                  Access: e.target.value,
                }));
              }}
              value={formData.Access}
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