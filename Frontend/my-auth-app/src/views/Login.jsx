import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [isLogin, setIsLogin] = useState(true);

    const [form, setForm] = useState({});

    const navigate = useNavigate();

    const handleFormToggle = () => {
        navigate('/register');
    };

    function handleInputChange(key, newValue) {
        form[key] = newValue;   // ex: form["username"] = "toto";
        setForm(form);
        console.log(form);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginURL = 'http://localhost:8080/auth/login';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': localStorage.getItem('token') // to authenticate a protected rule
            },
            body: JSON.stringify(form)
        }
        const response = await fetch(loginURL, options);
        console.log('response.status: ', response.status);

        if(response.status == 200) {
            const data= await response.json()
            console.log('data: ', data);

            const token = data.token;
            localStorage.setItem('token', token);

            const toastOptions = {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
            toast("Login successful!", toastOptions);
            setTimeout(() => {
                navigate('/home') //navigate to home after after 2 seconds
            }, 2000)
        } else {
            const toastOptions = {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
            toast.error("Login failed!", toastOptions);
            setTimeout(() => {
                navigate('/home') //navigate to home after after 2 seconds
            }, 2000)
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='form-label' htmlFor="username">Username:</label>
                    <input className='form-control' type="username" id="username" required onChange={(event) => handleInputChange('username', event.target.value)}/>
                </div>
                <br />
                <label className='form-label' htmlFor="password">Password:</label>
                <input className='form-control' type="password" id="password" required onChange={(event) => handleInputChange('password', event.target.value)}/>
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
            <button onClick={handleFormToggle}>
                New User? Register Here
            </button>
            <ToastContainer />
        </div>
    )
}

export default Login