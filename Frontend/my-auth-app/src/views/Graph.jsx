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
    const [optionsDict, setOptionsDict] = useState({});

    const [selectedCountries, setSelectedCountries] = useState([]);

    useEffect(() => {
        const newOptionsDict = { option1: selectedOption, option2: selectedOption2 };
        setOptionsDict(newOptionsDict);
    }, [selectedOption, selectedOption2]);



    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    };

    {/*const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    if (eventKey === "Methane" || eventKey === "Nitrous Oxide") {
        setSelectedOption2("Per country");
        document.getElementById("flexCheckDefault").disabled = true;
    } else if (eventKey === "C02") {
        setSelectedOption2("Per county");
        setSelectedOption2("Per capita");
        setSelectedOption2("Per $ of GDP");
        document.getElementById("flexCheckDefault").disabled = false;
    }
};
*/ }

    const handleSelect2 = (eventKey) => {
        setSelectedOption2(eventKey);
    };

    const handleImage = async (e) => {
        e.preventDefault();

        const loginURL = 'http://localhost:8080/file/file';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                countries: selectedCountries,
                options: optionsDict,
              }),

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




    const handleCountryChange = (e) => {
      const country = e.target.value;
      if (e.target.checked) {
        setSelectedCountries([...selectedCountries, country]);
      } else {
        setSelectedCountries(selectedCountries.filter(c => c !== country));
      }
    };





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
                                {//<Dropdown.Item eventKey="All GHGs" className="my-dropdown-item">All GHGs</Dropdown.Item>
                                }
                                <Dropdown.Item eventKey="Methane" className="my-dropdown-item">Methane</Dropdown.Item>
                                <Dropdown.Item eventKey="Nitrous Oxide" className="my-dropdown-item">Nitrous Oxide</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col order-5 d-flex">
                        <div className="form-check align-self-center">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled/>
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
                                {//<Dropdown.Item eventKey="Cumulative" className="my-dropdown-item">Cumulative</Dropdown.Item>
                                }{//<Dropdown.Item eventKey="Per MWh of Energy" className="my-dropdown-item">Per MWh of Energy</Dropdown.Item>
                                }<Dropdown.Item eventKey="Per $ of GDP" className="my-dropdown-item">Per $ of GDP</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='row my-2 d-flex'>
                    <div className='col col-2  px-0'>
                        <ul className='text-left'>
                            <li className='checkBoxHigh text-left'><input type="checkbox"  onChange={handleCountryChange} value='Argentina'/>Argentina</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Australia'/>Australia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Brazil'/>Brazil</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Canada'/>Canada</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='China'/>China</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Europe'/>Europe</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='France'/>France</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Germany'/>Germany</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Italy'/>Italy</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='India'/>India</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Indonesia'/>Indonesia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Japan'/>Japan</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Mexico'/>Mexico</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Russia'/>Russia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Saudi Arabia'/>Saudi Arabia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='South Africa'/>South Africa</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='South Korea'/>South Korea</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Turkey'/>Turkey</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Ukraine'/>Ukraine</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='United Kingdom'/>United Kingdom</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='United States'/>United States</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='World'/>World</li>
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