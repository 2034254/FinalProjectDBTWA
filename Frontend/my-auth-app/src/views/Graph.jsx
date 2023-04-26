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
    const [selectedOption2, setSelectedOption2] = useState('Per capita');

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    };

    const handleSelect2 = (eventKey) => {
        setSelectedOption2(eventKey);
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
                            <Dropdown.Menu>
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
                        <Dropdown onSelect={handleSelect2} >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                                {selectedOption2}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Per capita" className="my-dropdown-item">Per capita</Dropdown.Item>
                                <Dropdown.Item eventKey="Per country" className="my-dropdown-item">Per country</Dropdown.Item>
                                <Dropdown.Item eventKey="Cumulative" className="my-dropdown-item">Cumulative</Dropdown.Item>
                                <Dropdown.Item eventKey="Per MWh of Energy" className="my-dropdown-item">Per MWh of Energy</Dropdown.Item>
                                <Dropdown.Item eventKey="Per $ of GDP" className="my-dropdown-item">Per $ of GDP</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='row my-2 d-flex'>
                    <div className='col col-2  px-0'>
                        <ul className='text-left'>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Argentina</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" />Australia</li>
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
                    <div className='col col-2'></div>
                    <div className='col col-8 col-md-6 px-0 d-flex align-items-center justify-content-center mx-auto'  >
                        <span className='align-self-center mx-auto' >
                            <img src={xyz} alt="" className='imageSize' style={{ maxWidth: "100%", minWidth: "10%" }} />
                        </span>
                    </div>
                </div>
                <div className='row my-2 flex-wrap'>
                    <div className='col col-sm-3'>
                        <div typeof='button' onClick={handleImage} className='btn btn-primary regularButton'>
                            Generate Graph
                        </div>
                    </div>
                    <div className='col col-sm-1'></div>
                    <div className='col col-sm-3'>
                        <div typeof='button' className='btn btn-primary regularButton'>
                            Save
                        </div>
                    </div>
                    <div className='col col-sm-1'></div>
                    <div className='col col-sm-3'>
                        <div typeof='button' className='btn btn-primary regularButton'>
                            Download
                        </div>
                    </div>
                    <div className='col col-sm-1'></div>
                </div>
            </div>
        </div>
    )
}

export default Graph