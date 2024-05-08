import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { addEvent } from "../service/api";


function Add() {
    const [values, SetValues]= useState({
        name:'',
        description:'',
        nbTickets:0,
        price:0,
        img:'',
        nbParticipants:0,
        like:false
      })

      const navigate= useNavigate()
      const handleSubmit= (event)=> {
    
        event.preventDefault();
        
        addEvent(values)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err));}


      return(
        <div className="container mt-5">
    <h2>Add Event</h2>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" placeholder="Enter event name"
        onChange={e=> SetValues({...values, name: e.target.value})} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" className="form-control" id="description" placeholder="Enter description" 
                onChange={e=> SetValues({...values, description: e.target.value})} />
      </div>
      <div className="form-group">
        <label htmlFor="nbTickets">nbTickets</label>
        <input type="number" className="form-control" id="nbTickets" placeholder="Enter tickets number"
                         onChange={e=> SetValues({...values, nbTickets: e.target.value})} />
                         
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input type="number" className="form-control" id="price" placeholder="Enter price"
                         onChange={e=> SetValues({...values, price: e.target.value})} />
                         
      </div>


      <div className="form-group">
        <label htmlFor="nbParticipants">nbParticipants</label>
        <input type="number" className="form-control" id="nbParticipants" placeholder="Enter participants number"
                         onChange={e=> SetValues({...values, nbParticipants: e.target.value})} />
                         
      </div>



      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/" className="btn btn-danger"> Go back</Link>

    </form>
  </div>
      )
}


export default Add;

