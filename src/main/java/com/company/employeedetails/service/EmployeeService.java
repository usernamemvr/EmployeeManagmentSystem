package com.company.employeedetails.service;

import com.company.employeedetails.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto getEmployeeById(Long id);

    void deleteEmployeeById(Long id);

    EmployeeDto updateEmployeeById(Long id, EmployeeDto employeeDto);
}
