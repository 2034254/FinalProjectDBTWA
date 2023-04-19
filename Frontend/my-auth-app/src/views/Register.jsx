import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        console.log(form);
    }

    const handleSubmit = async (e) => {
        console.log(form);
        e.preventDefault();

        if(form.password !== form.confirmPassword) {
            toast.error("Password don't match", toastOptions);
            return;
        }

        if(!validatePassword(form.password)) {
            toast.error("Password don't match the criterias", toastOptions);
            return;
        }
            
        toast("Wow, so easy!", toastOptions);
    };

    function validatePassword(password) {
        const lengthRegex = /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]{8}[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]*/;
        const lengthTest = lengthRegex.test(password); // true/false

        const upperRegex = /A-Z/
        const upperTest = upperRegex.test(password);

        const lowerRegex = /a-z/
        const lowerTest = lowerRegex.test(password);

        const numbersRegex = /\d/
        const numbersTest = numbersRegex.test(password);

        const specialRegex = /[!#$%&'*+\/=?^_`{|}~-]/
        const specialTest = specialRegex.test(password);

        return lengthTest && upperTest && lowerTest && numbersTest && specialTest;
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='form-label' htmlFor="username">Username:</label>
                    <input className='form-control' type="username" id="username" required onChange={(event) => handleInputChange('username', event.target.value)}/>
                </div>
                <div>
                    <label className='form-label' htmlFor="email">Email:</label>
                    <input className='form-control' type="email" id="email" required onChange={(event) => handleInputChange('email', event.target.value)}/>
                </div>
                <br />
                <label className='form-label' htmlFor="password">Password:</label>
                <input className='form-control' type="password" id="password" required onChange={(event) => handleInputChange('password', event.target.value)}/>
                <br />
                <label className='form-label' htmlFor="confirmPassword">Confirm:</label>
                <input className='form-control' type="password" id="confirmPassword" required onChange={(event) => handleInputChange('confirmPassword', event.target.value)}/>
                <br />
                <label className='form-label' htmlFor="dob">DOB:</label>
                <input className='form-control' type="date" id="dob" required onChange={(event) => handleInputChange('dob', event.target.value)}/>
                <br />
                <label className='form-label' htmlFor="terms">Terms:</label>
                <input className='m-2 form-check-input' type="checkbox" id="terms" required onChange={(event) => handleInputChange('terms', event.target.checked)}/>
                <br />
                <button type="submit">Save</button>
            </form>
            <br />
            <button onClick={backToLogin}>
                Login? Click Here
            </button>
            <ToastContainer />
        </div>
    )
}

export default Register