import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


function NavigationBar(){
    return(

    <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className='bg-white border shadow p-4' style={{ width: '80%', maxWidth: '800px' }}>
        <Link to="/">events</Link>
        <Link to="/add" className="ml-2 btn btn-primary">Add Event</Link>
    </div>
</div>

    )
}

export default NavigationBar;

