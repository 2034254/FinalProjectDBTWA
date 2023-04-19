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
            <nav className='topbar'>
                <label>Data Explorer</label>
                <div className='container-left'>
                    <h2>C02</h2>
                    <ul>
                        <li>CO2</li>
                        <li>All GHGs</li>
                        <li>Methane</li>
                        <li>Nitrous Oxide</li>
                    </ul>
                </div>
                <dir className='container-right'>
                    <h2>Per capita</h2>
                    <ul>
                        <li>Per capita</li>
                        <li>Per country</li>
                        <li>Cumulative</li>
                        <li>Per MWh of Energy</li>
                        <li>Per $ of GDP</li>
                    </ul>
                </dir>
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