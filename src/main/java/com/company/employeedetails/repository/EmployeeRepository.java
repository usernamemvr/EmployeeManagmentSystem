package com.company.employeedetails.repository;

import com.company.employeedetails.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> { }
