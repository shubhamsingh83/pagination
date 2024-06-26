import React, { useState, useEffect } from "react";
import "./App.css"


function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Failed to fetch data".error);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }

    // else {
    //   setCurrentPage(1);
    // }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
           
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="divider" /> 
      <div className="pagination">
        <button onClick={prevPage} >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>{currentPage}</span>
        <button onClick={nextPage} >
          Next
        </button>
      </div>
    </div>
  );
}
export default App;
