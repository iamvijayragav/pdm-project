import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AddUser() {
  const PAGE_SIZE = 5;

  const initialInputState = {
    'name': '',
    'user_id': '',
    'email': '',
    'password': '',
    'company_name': '',
    'role': '',
  };

  const [inputList, setInputList] = useState(initialInputState);
  const [addedRows, setAddedRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeaders = [
    { id: 1, header: 'User Name', key: 'name' },
    { id: 2, header: 'User ID', key: 'user_id' },
    { id: 3, header: 'Email', key: 'email' },
    { id: 4, header: 'Password', key: 'password' },
    { id: 5, header: 'Company Name', key: 'company_name' },
    { id: 6, header: 'role', key: 'role' },
  ];

  const changeHandler = (e, key) => {
    const updatedInputList = { ...inputList };
    updatedInputList[key] = e.target.value;
    setInputList(updatedInputList);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/fetch-user");
      setAddedRows(response.data);
    } catch (err) {
      console.error("Error in Fetching Users", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const addUser = async () => {
    if (inputList.name.trim() === '' || inputList.user_id.trim() === '' || inputList.email.trim() === '') {
      alert('User Name, User ID and email are required.');
      return;
    }

    if (isEditing) {
      setIsEditing(false);
    }

    try {
      const result = axios.post('http://localhost:8081/add-user', inputList);
      alert("User Added Successfully", result.status);
    } catch (err) {
      console.error("Error in Adding Projects: ", err);
    }
    fetchUser();
    setInputList(initialInputState);
  };

  const deleteHandler = async (email) => {
    try {
      await axios.post("http://localhost:8081/api/delete-user", { email:email })
      
    } catch (err) {
      console.error("Error in Deleting User: ", err);
    }
    fetchUser();
    setInputList(initialInputState)
  };

  const editHandler = (Email) => {
    const FilterUser = addedRows.find(user => user.email === Email)
    setIsEditing(true);
    setInputList(FilterUser);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentRows = addedRows.slice(startIndex, endIndex);

  return (
    <div className='delegation-container'>
      <form onSubmit={addUser}>
        <label>User Name:
          <input
            type="text"
            name="name"
            value={inputList['name']}
            onChange={(e) => changeHandler(e, 'name')}
          />
        </label><br />
        <label>User Id :
          <input
            type="text"
            name="user_id"
            value={inputList.user_id}
            onChange={(e) => changeHandler(e,  'user_id')}
          />
        </label><br />
        <label>email :
          <input
            type="email"
            name="email"
            value={inputList.email}
            onChange={(e) => changeHandler(e, 'email')}
          />
        </label><br />
        <label>password :
          <input
            type="password"
            name="password"
            value={inputList.password}
            onChange={(e) => changeHandler(e, 'password')}
          />
        </label><br />
        <label>Company Name :
          <input
            type="text"
            name="company_name"
            value={inputList.company_name}
            onChange={(e) => changeHandler(e, 'company_name')}
          />
        </label>
        <label>role :
          <input
            type="text"
            name="role"
            value={inputList.role}
            onChange={(e) => changeHandler(e, 'role')}
          />
        </label>
        <input type="button" value={isEditing ? 'Update' : 'Add User'} onClick={addUser} />
      </form>
      <div>
        <h2>Added Rows</h2>
        <table>
          <thead>
            <tr>
              {tableHeaders.map((item) => (
                <th key={item.id}>{item.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={row._id}>
                {tableHeaders.map((item) => (
                  <td key={item.id}>{row[item.key]}</td>
                ))}
                <td>
                  <p onClick={() => deleteHandler(row.email)}>delete</p>
                  <p onClick={() => editHandler(row.email)}>edit</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= addedRows.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
