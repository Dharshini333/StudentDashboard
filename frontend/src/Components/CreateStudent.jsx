import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateStudent.css";

function CreateStudent() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !department || !dob) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    axios
      .post("http://localhost:8004/create/student", { name, department, dob })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          console.log(res);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };
  
  return (
    <div className="main">
      <h2>ADD STUDENT</h2>
      <div className="container">
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="">Student Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <label htmlFor="">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
}

export default CreateStudent;
