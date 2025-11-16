const API_BASE_URL = "http://localhost:8080";

// Load all employees on page load
window.addEventListener("load", () => {
  getAllEmployees();
});

// Get all employees
function getAllEmployees() {
  fetch(`${API_BASE_URL}/getemployees`)
    .then((response) => response.json())
    .then((data) => {
      displayEmployees(data);
    })
    .catch((error) => {
      showMessage("Error fetching employees", "error");
      console.error("Error:", error);
    });
}

// Display employees in table
function displayEmployees(employees) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  if (employees.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="5" style="text-align: center;">No employees found</td></tr>';
    return;
  }

  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.mobile}</td>
                    <td>${employee.email}</td>
                    <td>
                        <button class="btn-edit" onclick="editEmployee(${employee.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteEmployee(${employee.id})">Delete</button>
                    </td>
                `;
    tableBody.appendChild(row);
  });
}

// Save employee (create or update)
function saveEmployee() {
  const id = document.getElementById("employeeId").value;
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  if (!name || !mobile || !email) {
    showMessage("All fields are required", "error");
    return;
  }

  const employeeData = { name, mobile, email };

  if (id) {
    // Update employee
    fetch(`${API_BASE_URL}/updateEmployee/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.text())
      .then((data) => {
        showMessage("Employee updated successfully", "success");
        clearForm();
        getAllEmployees();
      })
      .catch((error) => {
        showMessage("Error updating employee", "error");
        console.error("Error:", error);
      });
  } else {
    // Create employee
    fetch(`${API_BASE_URL}/addemployee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.text())
      .then((data) => {
        showMessage("Employee added successfully", "success");
        clearForm();
        getAllEmployees();
      })
      .catch((error) => {
        showMessage("Error adding employee", "error");
        console.error("Error:", error);
      });
  }
}

// Edit employee
function editEmployee(id) {
  fetch(`${API_BASE_URL}/getemployee/${id}`)
    .then((response) => response.json())
    .then((employee) => {
      document.getElementById("employeeId").value = employee.id;
      document.getElementById("name").value = employee.name;
      document.getElementById("mobile").value = employee.mobile;
      document.getElementById("email").value = employee.email;
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      showMessage("Error fetching employee", "error");
      console.error("Error:", error);
    });
}

// Delete employee
function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    fetch(`${API_BASE_URL}/deleteemployee/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        showMessage("Employee deleted successfully", "success");
        getAllEmployees();
      })
      .catch((error) => {
        showMessage("Error deleting employee", "error");
        console.error("Error:", error);
      });
  }
}

// Clear form
function clearForm() {
  document.getElementById("employeeForm").reset();
  document.getElementById("employeeId").value = "";
}

// Show message
function showMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  setTimeout(() => {
    messageDiv.className = "message";
  }, 3000);
}
