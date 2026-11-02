import { TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function EmployeeForm({ onSave, employee }) {
  // formData stores all employee input values.
  // setFormData updates those values.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
  });
 
  // When a user types something, we need to capture that value.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: employee ? employee.id : Date.now(),
      ...formData,
    });

    setFormData({
      name: "",
      email: "",
      department: "",
      designation: "",
      salary: "",
    });
  };

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        designation: employee.designation,
        salary: employee.salary,
      });
    }
  }, [employee]);
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Employee Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Designation"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Salary"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        fullWidth
      />
      <button type="submit">
        {employee ? "Update Employee" : "Save Employee"}
      </button>
    </form>
  );
}
