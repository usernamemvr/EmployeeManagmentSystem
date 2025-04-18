import React, {useEffect, useState} from 'react';
import {deleteEmployee, listEmployees} from "../service/EmployeeService.js";
import {useNavigate} from "react-router-dom";

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => console.error(error))
    }, []);

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/update-employee/${id}`)
    }

    function deleteEmployeeById(id) {
        deleteEmployee(id).then(r => {
            setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id))
            console.log(r.data);
        });
        navigator('/employees')
    }

    return (
        <div className='container'>
            <h4 style={{ textAlign: 'center'}}>List of Employees</h4>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}> Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <td>Employee ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Email</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.fname}</td>
                        <td>{employee.lname}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info mb-2 me-3' onClick={() => updateEmployee(employee.id)}> UPDATE</button>
                            <button className='btn btn-danger mb-2' onClick={() => deleteEmployeeById(employee.id)}> DELETE</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;