import axios from 'axios';
import React, { useState } from 'react';

function AddUser() {
  const [inputList, setInputList] = useState([
    {
      'UserName': '',
      'UserId': '',
      'Email': '',
      'Password': '',
      'CompanyName': '',
      'Role': '',
    }
  ]);

  const [addedRows, setAddedRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const tableHeaders = [
    { id: 1, header: 'User Name', key: 'UserName' },
    { id: 2, header: 'User ID', key: 'UserId' },
    { id: 3, header: 'Email', key: 'Email' },
    { id: 4, header: 'Password', key: 'Password' },
    { id: 5, header: 'Company Name', key: 'CompanyName' },
    { id: 6, header: 'Role', key: 'Role' },
  ];

  const changeHandler = (e, rowIndex, key) => {
    const updatedInputList = [...inputList];
    updatedInputList[rowIndex][key] = e.target.value;
    setInputList(updatedInputList);
  };

  const addUser = () => {
    if (inputList[0]['UserName'].trim() === '' || inputList[0]['UserId'].trim() === '' || inputList[0]['Email'].trim() === '') {
      alert('User Name, User ID and Email are required.');
      return;
    }

    if (isEditing) {
      const updatedRows = [...addedRows];
      updatedRows[editIndex] = inputList[0];
      setAddedRows(updatedRows);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setAddedRows([...addedRows, ...inputList]);
    }

    try {
      const result = axios.post('http://localhost:8081/add-user', inputList[0]);
      alert("User Added Successfully", result.status);
    } catch (err) {
      console.error("Error in Adding Projects: ", err);
    }

    setInputList([{ 'UserName': '', 'UserId': '', 'Email': '', 'Password': '', 'CompanyName': '', 'Role':'' }]);
  };

  const deleteHandler = (index) => {
    const updatedRows = [...addedRows];
    updatedRows.splice(index, 1);
    setAddedRows(updatedRows);
  };

  const editHandler = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    console.log([addedRows[index]], "jj");
    setInputList([addedRows[index]]);
  };

  return (
    <div className='delegation-container'>
      <form onSubmit={addUser}>
        <label>User Name:
          <input
            type="text"
            name="userName"
            value={inputList[0].UserName}
            onChange={(e) => changeHandler(e, 0, 'UserName')}
          />
        </label><br />
        <label>User Id :
          <input
            type="text"
            name="userId"
            value={inputList[0].UserId}
            onChange={(e) => changeHandler(e, 0, 'UserId')}
          />
        </label><br />
        <label>Email :
          <input
            type="email"
            name="email"
            value={inputList[0].Email}
            onChange={(e) => changeHandler(e, 0, 'Email')}
          />
        </label><br />
        <label>Password :
          <input
            type="password"
            name="password"
            value={inputList[0].Password}
            onChange={(e) => changeHandler(e, 0, 'Password')}
          />
        </label><br />
        <label>Company Name :
          <input
            type="text"
            name="companyName"
            value={inputList[0].CompanyName}
            onChange={(e) => changeHandler(e, 0, 'CompanyName')}
          />
        </label>
        <label>Role :
          <input
            type="text"
            name="role"
            value={inputList[0].Role}
            onChange={(e) => changeHandler(e, 0, 'Role')}
          />
        </label>
        <input type="button" value={isEditing ? 'Update' : 'Add User'} onClick={addUser} />
      </form>
      {addedRows.length > 0 && (
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
              {addedRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {tableHeaders.map((item) => (
                    <td key={item.id}>{row[item.key]}</td>
                  ))}
                  <td>
                    <p onClick={() => deleteHandler(rowIndex)}>delete</p>
                    <p onClick={() => editHandler(rowIndex)}>edit</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddUser;
