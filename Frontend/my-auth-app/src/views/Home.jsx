import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import './home.css';

function Home() {

    const [username, setUserName] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    // On component load -> check auth
    useEffect(() => {
        // Verify auth
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
            return
        } try {
            const decodedToken = jwt_decode(token);
            setUserName(decodedToken.username);
            setIsAdmin(decodedToken.isAdmin);
        } catch(err) {
            console.error(err);
            navigate('/login');
            return
        }
    }, [])

    return(
        <div>
            <h1>Home</h1>
            Welcome {username}. You are logged in!
            {isAdmin? 'You are an admin btw.':''}
            <nav className='navbar navbar-dark bg-dark topnav'>
                <label>Data Explorer</label>
                <div className='btn-group'>
                    <h2>Gas or Warming</h2>
                    <button className='btn btn-secondary dropdown-toggle' type='button' id='defaultDropdown' data-bs-toggle='dropdown' data-bs-auto-close='true' aria-expanded='false'>
                        C02    
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='defaultDropdown'>
                        <li><a className='dropdown-item' href='#'>C02</a></li>
                        <li><a className='dropdown-item' href='#'>All GHGs</a></li>
                        <li><a className='dropdown-item' href='#'>Methane</a></li>
                        <li><a className='dropdown-item' href='#'>Nitrous Oxide</a></li>
                    </ul>
                </div>
                <div className='btn-group'>
                    <h2>Count</h2>
                    <button className='btn btn-secondary dropdown-toggle' type='button' id='defaultDropdown' data-bs-toggle='dropdown' data-bs-auto-close='true' aria-expanded='false'>
                        Per capita
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='defaultDropdown'>
                        <li><a className='dropdown-item' href='#'>Per capita</a></li>
                        <li><a className='dropdown-item' href='#'>Per country</a></li>
                        <li><a className='dropdown-item' href='#'>Cumulative</a></li>
                        <li><a className='dropdown-item' href='#'>Per MWh of Energy</a></li>
                        <li><a className='dropdown-item' href='#'>Per $ of GDP</a></li>
                    </ul>
                </div>
            </nav>
            <nav className='sidebar'>
                <ul>
                    <li><input type="checkbox" />Argentina</li>
                    <li><input type="checkbox" />Australia</li>
                    <li><input type="checkbox" />Brazil</li>
                    <li><input type="checkbox" />Canada</li>
                    <li><input type="checkbox" />China</li>
                    <li><input type="checkbox" />France</li>
                    <li><input type="checkbox" />Germany</li>
                    <li><input type="checkbox" />India</li>
                    <li><input type="checkbox" />Indonesia</li>
                    <li><input type="checkbox" />Japan</li>
                    <li><input type="checkbox" />Mexico</li>
                    <li><input type="checkbox" />Russia</li>
                    <li><input type="checkbox" />Ukraine</li>
                    <li><input type="checkbox" />United Kingdom</li>
                    <li><input type="checkbox" />United States</li>
                    <li><input type="checkbox" />World</li>
                </ul>
            </nav>
        </div>
    )
}

export default Home