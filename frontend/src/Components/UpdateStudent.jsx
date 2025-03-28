import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
      .put("http://localhost:8004/updateStudent/"+id, { name, department, dob })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>UPDATE STUDENT</h2>
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
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default UpdateStudent;
