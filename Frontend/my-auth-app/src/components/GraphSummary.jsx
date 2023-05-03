import React from 'react'
import "./GraphSummary.css";

function GraphSummary({title}) {

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
        <div className='p-1 col col-12 col-sm-12 col-md-4'></div>
        <div className='p-1 col col-12 col-sm-12 col-md-4 d-flex align-items-center justify-content-center'>{title}</div>
        <div className='p-1 col col-12 col-sm-12 col-md-4 flex-column flex-sm-row'>
            <button className='my-1 mx-1'>Consult</button>
            <button className='my-1 mx-1'>Delete</button>
        </div>
    </div>
  )
}

export default GraphSummary