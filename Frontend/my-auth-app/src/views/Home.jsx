import React, { useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './home.css';
import GraphSummary from '../components/GraphSummary'

function Home() {

    const [graph, setGraph] = useState([]);
    const [username, setUserName] = useState(null);
    const navigate = useNavigate();

    //const [decodedToken, setDecodedToken] = useState('');
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);

    // On component load -> check auth
    useEffect(() => {
        // Verify auth
        if(!token) {
            navigate('/login');
            return
        } try {
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
        
        async function fetchGraphs() {
            const url = 'http://localhost:8080/file/graphs' + `?user_id=${decodedToken.userId}`;
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': token
                }
            }
      
            const response = await fetch(url, options);
            if (response.status == 200) {
              const data = await response.json();
              setGraph(data.documents);
            }
          }

        fetchGraphs();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }



    return(
        <div>
            <div className='container-fluid'>
                <h1>Home</h1>
                <p>Welcome {username}. You are logged in!</p>
                
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-3 align-right">
                        <a href="/graph">
                            <button className="btn btn-success my-2">
                                Explore Graphs
                            </button>
                        </a>
                    </div>
                    <div className="col-3 text-right">
                        <button className="btn btn-success my-2" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
            
            {
                graph.map((graphData, index) => {
                    return <div className='container-fluid justify-content-center' style={{backgroundColor: 'grey', width: '60%'}} id={index} key={index}>
                        <GraphSummary title={graphData.name} graphId={graphData._id} graphType={graphData.graphType} countries={graphData.countries}/>
                    </div>
                })
            }
        </div>
    )
}

export default Home