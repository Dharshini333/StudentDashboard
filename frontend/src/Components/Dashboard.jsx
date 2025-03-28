import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'

function Dashboard() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8004")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8004/delete/student/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main">
      <h1>Student Dashboard</h1>
      <Link to="/create">ADD STUDENT</Link>
      <div className="container">
        <table>
          <thead>
            <th>NAME</th>
            <th>DEPARTMENT</th>
            <th>DATE OF BIRTH</th>
            <th>ACTIONS</th>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.dob}</td>
                  <td>
                    <Link to={`/update/${student._id}`}>Update</Link>{" "}
                    <button onClick={(e) => handleDelete(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
