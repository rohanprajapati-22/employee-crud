import "./App.css";
import { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import api from "./api/axiosInstance";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  // const [employees, setEmployees] = useState(() => {
  //   const savedEmployees = localStorage.getItem("employees");
  //   return savedEmployees ? JSON.parse(savedEmployees) : [];
  // });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   localStorage.setItem("employees", JSON.stringify(employees));
  // }, [employees]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSaveEmployee = (employee) => {
    if (selectedEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === selectedEmployee.id ? employee : emp)),
      );
    } else {
      setEmployees((prev) => [...prev, employee]);
    }

    setSelectedEmployee(null);
    setOpenDialog(false);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setOpenDialog(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!employeeToDelete) return;

    setEmployees((prev) =>
      prev.filter((emp) => emp.id !== employeeToDelete.id),
    );

    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await api.get("/Employees");

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="employee-container">
      {/* Header */}
      <Box className="page-header">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Employee Management
          </Typography>
          <Typography color="text.secondary">
            Manage your employee records
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </Box>

      {/* Employee Summary */}
      <Paper className="summary-card" elevation={2}>
        <Typography color="text.secondary">Total Employees</Typography>
        <Typography variant="h4" fontWeight="bold">
          {employees.length}
        </Typography>
      </Paper>

      {/* Employee Table */}
      <Paper className="table-card" elevation={2}>
        <Box className="table-header">
          <Typography variant="h6" fontWeight="bold">
            Employee List
          </Typography>

          <TextField
            size="small"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees.map((employee, index) => (
                <TableRow key={employee.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.department}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>
                    ₹{Number(employee.salary).toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditEmployee(employee)}
                      aria-label="Edit employee"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(employee)}
                      aria-label="Delete employee"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>
                      No employees found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedEmployee(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedEmployee ? "Edit Employee" : "Add New Employee"}
        </DialogTitle>

        <DialogContent dividers>
          <EmployeeForm
            onSave={handleSaveEmployee}
            employee={selectedEmployee}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setSelectedEmployee(null);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{employeeToDelete?.name}</strong>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>

          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
