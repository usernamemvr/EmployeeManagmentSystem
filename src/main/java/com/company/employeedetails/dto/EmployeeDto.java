package com.company.employeedetails.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EmployeeDto {

    private Long id;
    private String fname;
    private String lname;
    private String email;
}
