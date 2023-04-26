import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import Graph from './views/Graph'
import './index.css'
// Import Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Graph' element={<Graph />} />
    </Routes>
  </BrowserRouter>
)
