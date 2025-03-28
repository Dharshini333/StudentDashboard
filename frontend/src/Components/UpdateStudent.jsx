import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './UpdateStudent.css'

function UpdateStudent() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8004/getStudent/" + id)
      .then((res) => {
        console.log(res);
          setName(res.data.name),
          setDepartment(res.data.department),
          setDob(res.data.dob);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8004/updateStudent/" + id, {
        name,
        department,
        dob,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main">
      <h2>UPDATE STUDENT</h2>
      <div className="container">
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
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default UpdateStudent;
