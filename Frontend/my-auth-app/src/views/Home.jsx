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
              console.log(graph);
            }
          }

        fetchGraphs();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }


    const handleSave = async (e) => {
        e.preventDefault();
    
        const loginURL = 'http://localhost:8080/file/file';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                countries: selectedCountries,
                graphType: selectedGraph,
            }),
    
        }
        const response = await fetch(loginURL, options);
        console.log('response.status: ', response.status);
    
        if (response.status == 200) {
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            //console.log('imgUrl: ', imgUrl);
    
            // Open the image in a new tab
            window.open(imgUrl);
        }
    }

    return(
        <div>
            <h1>Home</h1>
            Welcome {username}. You are logged in!
            
            <div> 
                <Link to='/graph'>
                    <button className='btn btn-success my-2'>
                        Graph
                    </button>
                </Link>   
            </div> 
            {
                graph.map((graphData, index) => {
                    console.log(graphData)
                    return <div className='container-fluid justify-content-center' style={{backgroundColor: 'grey', width: '60%'}} key={index}>
                        <GraphSummary title={graphData.name} />
                    </div>
                })
            }
                {/*
                <div className='row my-2 mx-2' style={{backgroundColor: 'white'}}>
                    <div className='col col-4'></div>
                    <div className='col col-4 d-flex align-items-center justify-content-center'>Hola</div>
                    <div className='col col-4'>
                        <button className='my-1 mx-1'>Consult</button>
                        <button className='my-1 mx-1'>Delete</button>
                    </div>
                </div>
                <div className='row my-2 mx-2' style={{backgroundColor: 'white'}}>
                    <div className='col col-4'></div>
                    <div className='col col-4 d-flex align-items-center justify-content-center'>Hola</div>
                    <div className='col col-4'>
                        <button className='my-1 mx-1'>Consult</button>
                        <button className='my-1 mx-1'>Delete</button>
                    </div>
                </div>
                <div className='row my-2 mx-2' style={{backgroundColor: 'white'}}>
                    <div className='col col-4'></div>
                    <div className='col col-4 d-flex align-items-center justify-content-center'>Hola</div>
                    <div className='col col-4'>
                        <button className='my-1 mx-1'>Consult</button>
                        <button className='my-1 mx-1'>Delete</button>
                    </div>
                </div>
                */}

            <button className='btn btn-success my-2' onClick={handleLogout}>
                Logout
            </button>
            </div>
    )
}

export default Home