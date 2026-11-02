import { TextField, Button, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";

export default function EmployeeForm({ onSave, employee }) {
  const initialFormData = {
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: employee ? employee.id : Date.now(),
      ...formData,
    });

    setFormData(initialFormData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1 }}>
      <Grid container spacing={2}>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Employee Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            {employee ? "Update Employee" : "Save Employee"}
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
}
