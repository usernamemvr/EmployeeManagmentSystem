package com.company.employeedetails.impl;

import com.company.employeedetails.dto.EmployeeDto;
import com.company.employeedetails.mapper.EmployeeMapper;
import com.company.employeedetails.repository.EmployeeRepository;
import com.company.employeedetails.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Consumer;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        return EmployeeMapper.mapToEmployee(employeeRepository.save(EmployeeMapper.mapToEmployee(employeeDto)));
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository
                .findAll()
                .stream()
                .map(EmployeeMapper::mapToEmployee)
                .toList();
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        return EmployeeMapper.mapToEmployee
                (employeeRepository
                        .findById(id)
                        .orElseThrow(() -> new RuntimeException("Employee not found")
                        ));
    }

    @Override
    public void deleteEmployeeById(Long id) {
        employeeRepository.delete(EmployeeMapper.mapToEmployee(getEmployeeById(id)));
    }

    @Override
    public EmployeeDto updateEmployeeById(Long id, EmployeeDto employeeDto) {
        EmployeeDto fromDB = getEmployeeById(id);
        boolean Change = fromDB.equals(employeeDto);
        if (!Change) {
            setIfNotBlank(fromDB::setFname, employeeDto.getFname());
            setIfNotBlank(fromDB::setLname, employeeDto.getLname());
            setIfNotBlank(fromDB::setEmail, employeeDto.getEmail());

            employeeRepository.save(EmployeeMapper.mapToEmployee(fromDB));
            return fromDB;
        }
        return fromDB;
    }

    private void setIfNotBlank(Consumer<String> setter, String value) {
        if (value != null && !value.isEmpty()) {
            setter.accept(value);
        }
    }
}
