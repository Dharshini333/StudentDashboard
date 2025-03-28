import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateStudent.css";

function UpdateStudent() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const departments = [
    { value: "CSE", label: "Computer Science" },
    { value: "IT", label: "Information Technology" },
    { value: "MECH", label: "Mechanical" },
    { value: "ECE", label: "Electronics & Communication" },
    { value: "AI&ML", label: "Artificial Intelligence & Machine Learning" },
    { value: "ROBO", label: "Robotics" },
  ];
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
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>
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
