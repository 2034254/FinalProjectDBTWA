import React from 'react'
import "./GraphSummary.css";

function GraphSummary({title,graphId}) {

function deleteGraph(graphId){

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    

    async function deleteGraph() {
        const url = 'http://localhost:8080/file/delete' + `?graph_id=${graphId}`;
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': token
            }
        }
  
        const response = await fetch(url, options);
        if (response.status == 200) {
          const data = await response.json();
          console.log(data);
        }
      }

      deleteGraph();

}


  return (
 
    <div className='row my-2' style={{backgroundColor: 'white'}}>
        <div className='p-1 col col-12 col-sm-12 col-md-9 d-flex align-items-center '>{title}</div>
        <div className='p-1 col col-12 col-sm-12 col-md-3 flex-column flex-sm-row'>
            <button onClick={deleteGraph(graphId)}className='my-1 mx-1'>Consult</button>
            <button className='my-1 mx-1'>Delete</button>
        </div>
    </div>
  )
}

export default GraphSummary