import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom'

function Home() {

    const [count, setCount] = useState(0)
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
            <button className='btn btn-success' onClick={() => setCount((count) => count + 1)}>
                <Link to='/graph'>
                    Graph
                </Link>
            </button>
        </div>
    )
}

export default Home