import React from 'react'
import { Link } from 'react-router-dom';
import { serverUrl } from '../constansts';
import "./GraphSummary.css";

function GraphSummary({title,graphId,graphType,countries}) {

    const handleDelete = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const url = serverUrl + '/file/delete' + `?graph_id=${graphId}`;
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': token
            }
        }
    
        const response = await fetch(url, options);
        
        if (response.status == 200) {
            
            location.reload();
        }
    }

    const handleConsult = async (e) => {
        e.preventDefault();
        const query = `?graphType=${graphType}&countries=${countries.join(',')}`;
        const url = `/Graph${query}`;
        window.location.href = url;
    }

  return (
 
    <div className='row my-2' style={{backgroundColor: 'white'}}>
        <div className='p-1 col col-12 col-sm-12 col-md-9 d-flex align-items-center '>{title}</div>
        <div className='p-1 col col-12 col-sm-12 col-md-3 flex-column flex-sm-row'>
            <button onClick={handleConsult} className='my-1 mx-1'>Consult</button>
            <button onClick={handleDelete} className='my-1 mx-1'>Delete</button>
        </div>
    </div>
  )
}

export default GraphSummary