import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import './Graph.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Graph() {

    const [username, setUserName] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [xyz, setImage] = useState("");
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('C02');

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    };

    const handleImage = async (e) => {
        e.preventDefault();

        const loginURL = 'http://localhost:8080/file/file';
        const options = {
            method: 'GET',

        }
        const response = await fetch(loginURL, options);
        console.log('response.status: ', response.status);

        if (response.status == 200) {
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            //console.log('imgUrl: ', imgUrl);

            const img = new Image();
            img.src = imgUrl;
            setImage(imgUrl)
            //document.body.appendChild(img);
        }
    }


    // On component load -> check auth
    useEffect(() => {
        // Verify auth
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return
        } try {
            const decodedToken = jwt_decode(token);
            setUserName(decodedToken.username);
            setIsAdmin(decodedToken.isAdmin);
        } catch (err) {
            console.error(err);
            navigate('/login');
            return
        }
    }, [])

    return (
        <div style={{width:"100%"}}>
            
            <h1>Graph</h1>
          
            <div className="container-fluid">
                <div className="row my-2">
                    <div className="col">
                        <Dropdown onSelect={handleSelect} >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                                {selectedOption}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ minWidth: "200px" }} >
                                <Dropdown.Item eventKey="C02" className="my-dropdown-item">C02</Dropdown.Item>
                                <Dropdown.Item eventKey="All GHGs" className="my-dropdown-item">All GHGs</Dropdown.Item>
                                <Dropdown.Item eventKey="Methane" className="my-dropdown-item">Methane</Dropdown.Item>
                                <Dropdown.Item eventKey="Nitrous Oxide" className="my-dropdown-item">Nitrous Oxide</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                    </div>
                    <div className="col order-5 d-flex">
                        <div className="form-check align-self-center">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Relative to world total
                            </label>
                        </div>
                    </div>
                    <div className="col order-1">
                        <div className='btn-group buttonDropdown'>
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
                    </div>
                </div>
                <div className='row my-2 d-flex'>
                    <div className='col col-2  px-0'>
                        <ul className='text-left'>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />    Argentina</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />    Australia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Brazil</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Canada</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />China</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />France</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Germany</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />India</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Indonesia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Japan</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Mexico</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Russia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Ukraine</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />United Kingdom</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />United States</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />World</li>
                        </ul>
                    </div>
                    <div className='col col-9 px-0 d-flex'  >
                        <span className='align-self-center' >
                            <img src={xyz} alt="" className='imageSize' />
                        </span>
                    </div>
                </div>
                <div className='row  my-2'>
                    <div className='col col-3'>
                        <div typeof='button' onClick={handleImage} className='btn btn-primary regularButton'>
                            Generate Graph
                        </div>
                    </div>
                    <div className='col col-2'></div>
                    <div className='col col-2'>
                        <div typeof='button' className='btn btn-primary regularButton'>
                            Save
                        </div>
                    </div>
                    <div className='col col-2'>
                        <div typeof='button' className='btn btn-primary regularButton'>
                            Download
                        </div>
                    </div>
                    <div className='col col-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Graph