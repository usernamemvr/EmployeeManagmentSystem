package com.company.employeedetails.controller;

import com.company.employeedetails.dto.EmployeeDto;
import com.company.employeedetails.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;


    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        return new ResponseEntity<>(employeeService.createEmployee(employeeDto), HttpStatus.CREATED);
    }

    @GetMapping
    public List<EmployeeDto> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeDto getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployeeById(@PathVariable Long id) {
        String deletedEmployee = employeeService.getEmployeeById(id).toString();
        employeeService.deleteEmployeeById(id);
        return "Deleted Employee:\n" + deletedEmployee;
    }

    @PutMapping("/{id}")
    public EmployeeDto updateEmployeeById(@PathVariable Long id, @RequestBody EmployeeDto employeeDto) {
        return employeeService.updateEmployeeById(id, employeeDto);
    }
}
