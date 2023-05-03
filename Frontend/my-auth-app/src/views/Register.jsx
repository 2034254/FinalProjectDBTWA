import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import greenLogo2 from '../assets/greenLab2.jpg';
import './Register.css';
const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

function Register() {
    //onClick={handleFormToggle}

    const navigate = useNavigate();

    const [form, setForm] = useState({});

    const backToLogin = () => {
        navigate('/login');
    };

    function handleInputChange(key, newValue) {
        form[key] = newValue;   // ex: form["username"] = "toto";
        setForm(form);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerURL = 'http://localhost:8080/auth/register';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        const response = await fetch(registerURL, options);
        const responseBody = await response.json();

        if (responseBody.message === 'Success.') {
            toast.success(responseBody.message, toastOptions);
            setTimeout(() => {
                navigate('/login') //navigate to home after after 2 seconds
            }, 2000)
        } else {
            toast.error(responseBody.message, toastOptions);
        }
    };

    useEffect(() => {
        // Verify auth
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp >= currentTime) {
                    navigate('/');
                    return
                }
            } catch(err) {
                console.error(err);
                return
            }
        }
    }, [])

    return(
        <div>
            <div className='container'>
                <span className='align-self-center' >
                    <img src={greenLogo2} alt="Green Lab2" className='' />
                </span>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className='row g-3 justify-content-center'>
                        <div className='col-auto'>
                            <br />    
                                <label className='form-label' htmlFor="username">Username:</label>
                                <input className='form-control' type="username" id="username" required onChange={(event) => handleInputChange('username', event.target.value)}/>
                        </div>
                    </div>
                    <div className='row g-3 justify-content-center'>
                        <div className='col-auto'>
                            <br />
                                <label className='form-label' htmlFor="email">Email:</label>
                                <input className='form-control' type="email" id="email" required onChange={(event) => handleInputChange('email', event.target.value)}/>
                        </div>
                    </div>
                    <div className='row g-3 justify-content-center'>
                        <div className='col-auto'>
                            <br />
                                <label className='form-label' htmlFor="password">Password:</label>
                                <input className='form-control' type="password" id="password" required onChange={(event) => handleInputChange('password', event.target.value)}/>
                        </div>
                    </div>
                    <div className='row g-3 justify-content-center'>
                        <div className='col-auto'>
                            <br />
                                <label className='form-label' htmlFor="confirmPassword">Confirm:</label>
                                <input className='form-control' type="password" id="confirmPassword" required onChange={(event) => handleInputChange('confirmPassword', event.target.value)}/>
                        </div>
                    </div>
                    <div className='row g-3 justify-content-center'>
                        <div className='col-auto'>
                            <br />
                                <label className='form-label' htmlFor="dob">DOB:</label>
                                <input className='form-control' type="date" id="dob" required onChange={(event) => handleInputChange('dob', event.target.value)}/>
                        </div>
                    </div>
                    <div className='row g-3 justify-content-center'>
                        <div className='col-auto'>
                            <br />
                                <label className='form-label' htmlFor="terms">Terms:</label>
                                <input className='m-2 form-check-input' type="checkbox" id="terms" required onChange={(event) => handleInputChange('terms', event.target.checked)}/>
                        </div>
                    </div>
                    <br />
                        <button type="submit">Save</button>
                </form>
                <br />
                    <button onClick={backToLogin}>
                        Login? Click Here
                    </button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register