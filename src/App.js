import "./App.css";
import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function App() {
  const [employees, setEmployees] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSaveEmployee = (employee) => {
    if (selectedEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? employee : emp,
        ),
      );

      setSelectedEmployee(null);
    } else {
      // Add new employee
      setEmployees([...employees, employee]);
    }
  };

  // const handleDeleteEmployee = (id) => {
  //   setEmployees(employees.filter((employee) => employee.id !== id));
  // };
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setEmployees((prevEmployees) =>
    prevEmployees.filter(
      (emp) => emp.id !== employeeToDelete.id
    )
  );

    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  // selectedEmployee stores the employee currently being edited.
  // setSelectedEmployee() changes the selected employee.
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div>
      <h1>Employee Management</h1>

      <EmployeeForm onSave={handleSaveEmployee} employee={selectedEmployee} />

      <h2>Employee List</h2>

      {employees.map((employee) => (
        <div key={employee.id}>
          <h3>{employee.name}</h3>
          <p>{employee.email}</p>
          <p>{employee.department}</p>
          <p>{employee.designation}</p>
          <p>{employee.salary}</p>
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>

            <DialogContent>
              Are you sure you want to delete {employeeToDelete?.name}?
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>

              <Button onClick={confirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <button onClick={() => handleDeleteClick(employee)}>Delete</button>
          <button onClick={() => handleEditEmployee(employee)}>Edit</button>
        </div>
      ))}

      <h3>Total Employees: {employees.length}</h3>
    </div>
  );
}

export default App;
