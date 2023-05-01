import React from 'react'

function GraphSummary({countries, graphType, date}) {

    const title = 'Unknown';

    function determineTitle(graphType){
        if(graphType == 'annual_co2_emissions'){
            title = 'Annual CO2 Emissions (1950 - 2018)'
        } else if(graphType == 'per_gdp_co2'){
            title = 'Carbon Emissions intensity of economies (1950 - 2018)'
        } else if(graphType == 'annual_nitrous_oxide_emissions'){
            title = 'Annual Nitrous Oxide emmissions (1950 - 2018)'
        } else if(graphType == 'annual_methane_emissions'){
            title = 'Annual Methane emmissions (1950 - 2018)'
        } else if(graphType == 'per_capita_co2'){
            title = 'Per Capita by CO2 Emissions (1950 - 2018)'
        } else if(graphType == 'c02_emmissions_worldtotal'){
            title = 'Annual share of gloabl CO2 emmissions (1950 - 2018)'
        } else if(graphType == 'co2_from_greenhouse_emissions'){
            title = 'Annual CO2 Emissions from Greenhouse Gas (1950 - 2018)'
        } else {
            title = 'Annual Greenhouse Gas Emissions (1950 - 2018)'
        }
        return title;
    }

  return (
    /*<div className="card border border-3 border-dark p-1">
        <img src={imgLink || "https://www.altavod.com/assets/images/poster-placeholder.png"} style={{maxHeight: "50vh"}} alt="Poster image not available" />
        <div className="card-body">
            <h5>{title}</h5>
            <p>{plot}</p>
            <div>
            {
                genres.map((genre, index) => {
                    return <span key={index} className='badge text-bg-info p-2 mx-1'>{genre}
                    </span>
                })
            }
            </div>
        </div>
    </div>*/
    <div className='row my-2 mx-2' style={{backgroundColor: 'white'}}>
        <div className='col col-4'></div>
        <div className='col col-4 d-flex align-items-center justify-content-center'>{determineTitle(graphType)} {date}</div>
        <div className='col col-4'>
            <button className='my-1 mx-1'>Consult</button>
            <button className='my-1 mx-1'>Delete</button>
        </div>
    </div>
  )
}

export default GraphSummary