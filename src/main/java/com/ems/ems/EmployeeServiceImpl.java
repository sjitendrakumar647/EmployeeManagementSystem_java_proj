package com.ems.ems;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    //if you don't want to write '@Autowired' in place of this make the above EmployeeRepository as 'final'
    //and add the below constructor for injection

    // public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
    //     this.employeeRepository = employeeRepository;
    // }

    @Override
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);

        // employees.add(employee);
        employeeRepository.save(employeeEntity);
        return "Employee created successfully";
    }

    @Override
    public List<Employee> getAllEmployees() {

        List<EmployeeEntity> employeeList = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();

        for (EmployeeEntity employeeEntity : employeeList) {
            Employee emp = new Employee();

            //if we don't write this the it will return the null value
            
            emp.setId(employeeEntity.getId());
            emp.setName(employeeEntity.getName());
            emp.setMobile(employeeEntity.getMobile());
            emp.setEmail(employeeEntity.getEmail());

            employees.add(emp);
        }
        return employees;
    }

        @Override
        public Employee getEmployeeById(Long id) {
            EmployeeEntity empEntity = employeeRepository.findById(id).get();
            Employee employee = new Employee();
            BeanUtils.copyProperties(empEntity, employee);
            
            return employee;
        }

    @Override
    public boolean deleteEmployee(Long id) {
        EmployeeEntity emp = employeeRepository.findById(id).get();
        employeeRepository.delete(emp); 
        return true;
        // return employees.removeIf(employee -> employee.getId().equals(id));

        //lambda expression - employee -> employee.getId().equals(id)
        //in this expression parameter employee represents the each object in the list
    }

    @Override
    public String updateEmployee(Long id, Employee employee) {
        EmployeeEntity emp = employeeRepository.findById(id).get();

        emp.setName(employee.getName());
        emp.setMobile(employee.getMobile());
        emp.setEmail(employee.getEmail());

        employeeRepository.save(emp);

        return "employee updated successfully.";
    }
    
}
