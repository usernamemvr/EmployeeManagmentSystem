package com.company.employeedetails.mapper;

import com.company.employeedetails.dto.EmployeeDto;
import com.company.employeedetails.entity.Employee;

public class EmployeeMapper {
    // using Method Overloading

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        // Add null check and exception
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFname(),
                employeeDto.getLname(),
                employeeDto.getEmail()
        );
    }

    public static EmployeeDto mapToEmployee(Employee employee) {
        // Add null check and exception
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }
}
