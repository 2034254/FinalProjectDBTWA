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
    const [imageToSend, setImage] = useState("");
    const navigate = useNavigate();
    const [firstMenuText, setFirstMenuText] = useState('C02');
    const [secondMenuText, setSecondMenuText] = useState('Per country');


    //const [optionsDict, setOptionsDict] = useState({});

    useEffect(() => {
        setSelectedGraph("annual_co2_emissions");
    }, []);

    const [selectedCountries, setSelectedCountries] = useState([]);
    console.log('selectedCountries: ', selectedCountries);
    const [selectedGraph, setSelectedGraph] = useState([]);



    console.log('selectedGraph: ', selectedGraph);

    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabled2, setIsDisabled2] = useState(false);
    const [checked, setChecked] = useState(false);

    // This code sets up a useEffect hook that updates the optionsDict whenever the selected graph or selected countries changes. 

    // useEffect(() => {

    //     const newOptionsDict = { graphType: selectedGraph, country: selectedCountries };

    //     setOptionsDict(newOptionsDict);

    //     console.log('newOptionsDict: ', newOptionsDict);

    // }, [selectedGraph, selectedCountries]);


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


    const handleFirstMenuText = (eventKey) => {
        setFirstMenuText(eventKey);
        if (eventKey === "Methane") {
            setSelectedGraph("annual_methane_emissions");
            document.getElementById("flexCheckDefault").disabled = true;
            handleSecondMenuText("Per country");
            setIsDisabled(true)
            setChecked(false)


        } else if (eventKey === "C02") {
            document.getElementById("flexCheckDefault").disabled = false;
            if (!checked) {
                console.log('checked: ', checked);
                setSecondMenuText("Per country")
                setIsDisabled(true)
                setIsDisabled2(true)
                setSelectedGraph('c02_emmissions_worldtotal')
            } else if (checked) {

                setSelectedGraph("annual_co2_emissions");
                document.getElementById("flexCheckDefault").disabled = false;
                setIsDisabled(false)
                setSecondMenuText("Per country")


            }



        } else if (eventKey === "Nitrous Oxide") {
            setSelectedGraph("annual_nitrous_oxide_emissions");
            document.getElementById("flexCheckDefault").disabled = true;
            handleSecondMenuText("Per country");
            setIsDisabled(true)
            setChecked(false)
        } else if (eventKey === "Greenhouse gas") {
            setSelectedGraph("annual_greenhouse_gas_emissions");
            document.getElementById("flexCheckDefault").disabled = true;
            handleSecondMenuText("Per country");
            setIsDisabled(true)
            setChecked(false)

        }
    };


    const handleSecondMenuText = (eventKey) => {

        setSecondMenuText(eventKey);

        if (eventKey == "Per capita") {
            setSelectedGraph("per_capita_co2");
        } else if (eventKey == "Per $ of GDP") {
            setSelectedGraph("per_gdp_co2");
        } else if (eventKey == "Per country") {
            if (firstMenuText == "C02") {
                setSelectedGraph("annual_co2_emissions");
            }

        } else if (eventKey == "CO2 amount in GHG") {
            setSelectedGraph("co2_from_greenhouse_emissions");
        }


    }


    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        //console.log('checked: ', checked);
        if (!checked) {
            console.log("checked")
            setSecondMenuText("Per country")
            setIsDisabled(true)
            setIsDisabled2(true)
            setSelectedGraph('c02_emmissions_worldtotal')

        } else {
            console.log("unchecked")

            setIsDisabled2(false)
            setIsDisabled(false)
            setSelectedGraph('annual_co2_emissions')
        }
        // Do something else based on the value of `event.target.checked`
    };




    const handleImage = async (e) => {
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
    //console.log(selectedCountries)




    // // On component load -> check auth
    // useEffect(() => {
    //     // Verify auth
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         navigate('/login');
    //         return
    //     } try {
    //         const decodedToken = jwt_decode(token);
    //         setUserName(decodedToken.username);
    //         setIsAdmin(decodedToken.isAdmin);
    //     } catch (err) {
    //         console.error(err);
    //         navigate('/login');
    //         return
    //     }
    // }, [])

    const handleSave = async (e) => {
        e.preventDefault();
        const saveUrl = 'http://localhost:8080/file/save';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                graph: {
                    countries: selectedCountries,
                    graphType: selectedGraph,
                    date: new Date().toLocaleDateString()
                }
            }),

        }
        const response = await fetch(saveUrl, options);
        console.log('response.status: ', response.status);
    }

    return (
        <div style={{ width: "100%" }}>

            <h1>Graph</h1>

            <div className="container-fluid">
                <div className="row my-2">
                    <div className="col">
                        <Dropdown onSelect={handleFirstMenuText} >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                                {firstMenuText}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <Dropdown.Item eventKey="C02" disabled={isDisabled2} className="my-dropdown-item">C02</Dropdown.Item>

                                <Dropdown.Item eventKey="Methane" disabled={isDisabled2} className="my-dropdown-item">Methane</Dropdown.Item>
                                <Dropdown.Item eventKey="Nitrous Oxide" disabled={isDisabled2} className="my-dropdown-item">Nitrous Oxide</Dropdown.Item>

                                <Dropdown.Item eventKey="Greenhouse gas" disabled={isDisabled2} className="my-dropdown-item">Greenhouse gas</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col order-5 d-flex">
                        <div className="form-check align-self-center">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Relative to world total
                            </label>
                        </div>
                    </div>
                    <div className="col order-1">
                        <Dropdown id="drop_down_2" onSelect={handleSecondMenuText} >
                            <Dropdown.Toggle variant="success" id="dropdown-basic2" className="custom-dropdown">
                                {secondMenuText}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item disabled={isDisabled} eventKey="Per country" className="my-dropdown-item">Per country</Dropdown.Item>
                                <Dropdown.Item id="per_capita" eventKey="Per capita" className="my-dropdown-item" disabled={isDisabled}>Per capita</Dropdown.Item>
                                <Dropdown.Item id="per_gdp" eventKey="Per $ of GDP" className="my-dropdown-item" disabled={isDisabled}>Per $ of GDP</Dropdown.Item>

                                <Dropdown.Item id="co2_per_ghg" eventKey="CO2 amount in GHG" className="my-dropdown-item" disabled={isDisabled}>CO2 amount in GHG</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='row my-2 d-flex'>
                    <div className='col col-2  px-0'>
                        <ul className='text-left'>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Argentina' />Argentina</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Australia' />Australia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Brazil' />Brazil</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Canada' />Canada</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='China' />China</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Europe' />Europe</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='France' />France</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Germany' />Germany</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Italy' />Italy</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='India' />India</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Indonesia' />Indonesia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Japan' />Japan</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Mexico' />Mexico</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Russia' />Russia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Saudi Arabia' />Saudi Arabia</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='South Africa' />South Africa</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='South Korea' />South Korea</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Turkey' />Turkey</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='Ukraine' />Ukraine</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='United Kingdom' />United Kingdom</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='United States' />United States</li>
                            <li className='checkBoxHigh text-left'><input type="checkbox" onChange={handleCountryChange} value='World' />World</li>
                        </ul>
                    </div>
                    <div className='col col-2'></div>
                    <div className='col col-8 col-md-6 px-0 d-flex align-items-center justify-content-center mx-auto'  >
                        <span className='align-self-center mx-auto' >
                            <img src={imageToSend} alt="" className='imageSize' style={{ maxWidth: "100%", minWidth: "10%" }} />
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
                        <div typeof='button' onClick={handleSave} className='btn btn-primary regularButton'>
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