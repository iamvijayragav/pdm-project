import React, { useState, useEffect } from "react";
import PackageData from "../PackageData/PackageData";
import axios from 'axios';
import { logDOM } from "@testing-library/react";

const Sidebar = () => {
  const [IsProject, setIsProject] = useState(false);
  const [SelectedProject, setSelectedProject] = useState('');
  const [Projects, setProjects] = useState([]);
  const [ProjectList, setProjectList] = useState([]);
  const [MatchedProject, setMatchedProject] = useState([]);

  const HandleProjectClick = (project) => {
    setIsProject(true);
    setSelectedProject(project)
  };

  const CurrUser = localStorage.getItem('user_id');



  const FetchProjects = async () => {
    // * fetch all projects list
    try {
      const Project = await axios.post('http://localhost:8081/api/fetch-project');
      return Project.data;

    } catch (err) {
      console.error("Error in fetching projects", err);
    }
  }


  const FetchUserAccess = async () => {
    // * fetch access to the projects
    const Projects = await FetchProjects();
    try {
      const UserAccess = await axios.post('http://localhost:8081/api/fetch-project-access');
      setMatchedProject(UserAccess.data);
  
      const userProjects = UserAccess.data.filter(entry => entry.user_id === CurrUser);
  
      const userProjectCodes = userProjects.map(entry => entry.project_code);
  
      const filteredProjects = Projects.filter(entry => userProjectCodes.includes(entry.project_code));
  
      setMatchedProject(filteredProjects.map(entry => entry.database));


    } catch (err) {
      console.error("Error in Fetching Access", err);
    }

  }
  useEffect(() => {
    FetchUserAccess();
  },[])

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">Projects</div>
        <ul className="project-list">
          {MatchedProject.map((project, index) => (
            <li
              key={index}
              className="project-item"
              value={project}
              onClick={() => HandleProjectClick(project)}
            >
              {project}
            </li>
          ))}
        </ul>
      </div>
      {IsProject && <PackageData dataBasename={SelectedProject} />}
    </>
  );
};

export default Sidebar;
