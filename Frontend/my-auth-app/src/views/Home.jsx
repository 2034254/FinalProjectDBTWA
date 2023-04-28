import React, { useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './home.css';

function Home() {

    const [username, setUserName] = useState(null);
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
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                navigate('/login');
                return;
            }
            setUserName(decodedToken.username);
        } catch(err) {
            console.error(err);
            navigate('/login');
            return
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return(
        <div>
            <h1>Home</h1>
            Welcome {username}. You are logged in!
            
            <div> 
                <Link to='/graph'>
                    <button className='btn btn-success'>
                        Graph
                    </button>
                </Link>   
            </div> 
            <button className='btn btn-success' onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Home