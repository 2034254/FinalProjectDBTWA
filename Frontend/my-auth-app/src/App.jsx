import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)


  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginURL = 'http://localhost:8080/file/file';
    const options = {
        method: 'GET',
        
    }
    const response = await fetch(loginURL, options);
    console.log('response.status: ', response.status);

    if(response.status == 200) {
        const data= await response.json()
        console.log('data: ', data);

        //const token = data.token;
        //localStorage.setItem('token', token);

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
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button className='btn btn-success'  onClick={() => setCount((count) => count + 1)}>
          <Link to='/login'>
            Login
          </Link>
        </button>
        <button className='btn btn-success'  onClick={handleSubmit}>
          
            MAPA
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
