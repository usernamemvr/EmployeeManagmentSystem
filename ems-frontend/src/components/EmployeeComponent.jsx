import React, {useState, useEffect} from 'react';
import {addEmployee, getEmployeeById, updateEmployee} from "../service/EmployeeService.js";
import {useNavigate, useParams} from "react-router-dom";

const EmployeeComponent = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({fname: '', lname: '', email: ''});
    // const [employee, setEmployee] = useState({fname: '', lname: '', email: ''});


    const { id } = useParams()

    const navigator = useNavigate();

    useEffect(() => {
        getEmployeeById(id).then((response) => {
            setFname(response.data.fname)
            setLname(response.data.lname)
            setEmail(response.data.email)
        }).catch(error => console.error(error))
    }, [id]);



    function saveEmployee(e) {
        e.preventDefault();
        if(validateForm()){
            if(id) {
                updateEmployee(id,{fname, lname, email}).then(
                    r => {
                        console.log(r.data);
                        navigator('/employees')
                    });
                return;
            }
            addEmployee({fname, lname, email}).then(r => console.log(r.data));
            navigator('/employees');
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if(fname.trim()){
            errorsCopy.fname = '';
        } else {
            errorsCopy.fname = 'First Name is required';
            valid = false;
        }

        if(lname.trim()){
            errorsCopy.lname = '';
        } else {
            errorsCopy.lname = 'Last Name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{ id  ? 'Update Employee' : 'Add Employee'}</h2>
                    <div className='card-body'>
                        <div className='form-group mb-2'>
                            <form>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={fname}
                                    className={`form-control ${ errors.fname ? 'is-invalid' : '' }`}
                                    onChange={(event) => setFname(event.target.value)}
                                />
                                { errors.fname && <div className='invalid-feedback'>{errors.fname}</div>}
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lname}
                                    className={`form-control ${ errors.lname ? 'is-invalid' : '' }`}
                                    onChange={(event) => setLname(event.target.value)}
                                />
                                { errors.lname && <div className='invalid-feedback'>{errors.lname}</div>}
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${ errors.email ? 'is-invalid' : '' }`}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                { errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                <button className='btn btn-success mb-2 mt-2' onClick={saveEmployee}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;