package com.ems.ems;

import java.util.List;

public interface EmployeeService {
    String createEmployee(Employee employee) ;
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    boolean deleteEmployee(Long id);
    String updateEmployee(Long id, Employee employee);
    
}
