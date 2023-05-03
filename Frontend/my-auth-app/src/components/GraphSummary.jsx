import React from 'react'
import "./GraphSummary.css";

function GraphSummary({title,graphId,graphType,countries}) {

    const handleDelete = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const url = 'http://localhost:8080/file/delete' + `?graph_id=${graphId}`;
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': token
            }
        }
    
        const response = await fetch(url, options);
        
        if (response.status == 200) {
            
            send('deleted')
        }
    }



  return (
 
    <div className='row my-2' style={{backgroundColor: 'white'}}>
        <div className='p-1 col col-12 col-sm-12 col-md-9 d-flex align-items-center '>{title}</div>
        <div className='p-1 col col-12 col-sm-12 col-md-3 flex-column flex-sm-row'>
            <button onClick={{/*    LINK TO GRAPH PAGE WITH A QUERY THAT HOLDS GRAPHTYPE AND COUNTIES file/grahps?graphType=${graphType}&countries=${countries}
         */}} className='my-1 mx-1'>Consult</button>
            <button onClick={handleDelete} className='my-1 mx-1'>Delete</button>
        </div>
    </div>
  )
}

export default GraphSummary