import React, { useState } from 'react';
import axios from 'axios';

function AddProject() {
  const [formData, setFormData] = useState({
    projectName: '',
    projectCode: '',
  });

  const [errors, setErrors] = useState({
    projectName: '',
    projectCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear validation error when input changes
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { projectName: '', projectCode: '' };

    if (formData.projectName.trim() === '') {
      newErrors.projectName = '* Project Name is required';
      isValid = false;
    }

    if (formData.projectCode.trim() === '') {
      newErrors.projectCode = '* Project Code is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:8081/add-project', formData);
      alert('Project Added/Updated Successfully');
    } catch (err) {
      console.error("Error Adding Project: ", err);
    }
    setFormData({
      projectCode: '',
      projectName: ''
    });
  };

  return (
    <div className='add-project-container'>
      <form onSubmit={handleSubmit}>
        <label className='add-project-label'>Project Name:
          <input
            type="text"
            name='projectName'
            value={formData.projectName}
            placeholder={'Enter the Project Name'}
            onChange={handleChange}
          />
          <span className="error" style={{color:'red'}}>{errors.projectName}</span>
        </label>
        <label className='add-project-label'>Project Code:
          <input
            type="text"
            name='projectCode'
            value={formData.projectCode}
            placeholder='Enter Project Code'
            onChange={handleChange}
          />
          <span className="error" style={{color:'red'}}>{errors.projectCode}</span>
        </label>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default AddProject;
