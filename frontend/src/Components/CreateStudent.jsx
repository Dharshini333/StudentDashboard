import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8004/create/student", { name, department, dob })
      .then((res) => {
        console.log(res)
        navigate('/')
    })
      .catch((err) => console.log(err))
};
  return (
    <div>
      <h2>ADD STUDENT</h2>
      <div>
        <label htmlFor="">Student Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <label htmlFor="">Date of Birth</label>
        <input
          type="text"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
}

export default CreateStudent;
