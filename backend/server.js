const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(cors());

//database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Studentdetails")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//create schema
const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  dob: { type: String, required: true },
});

//create model
const students = mongoose.model("students", studentSchema);

app.post("/create/student", async (req, res) => {
  try {
    const data = req.body;
    console.log("request body", req.body);
    const newStud = new students(data);
    await newStud.save();
    res.json({ message: "Added Successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/", async (req, res) => {
  try {
    const data = await students.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getStudent/:id", (req, res) => {
  const id = req.params.id;
  students
    .findById({ _id: id })
    .then((stud) => res.json(stud))
    .catch((err) => res.json(err));
});

app.put("/updateStudent/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  students
    .findByIdAndUpdate(
      { _id: id },
      { name: data.name, department: data.department, dob: data.dob }
    )
    .then((stud) => res.json(stud))
    .catch((err) => res.json(err));
});

app.delete('/delete/student/:id',(req,res)=>{
    const id = req.params.id;
    students.findByIdAndDelete({_id:id})
    .then((stud) => res.json(stud))
    .catch((err) => res.json(err));
})

app.listen(8004, () => {
  console.log("listenting on port 8004");
});
