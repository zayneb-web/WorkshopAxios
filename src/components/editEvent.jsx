import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function EditEvent() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        nbTickets: 0,
        price: 0,
        nbParticipants: 0, 
    });

    const { id } = useParams();
    const navigate= useNavigate()
  
    useEffect(() => {
        axios.get(`http://localhost:3001/events/${id}`) 
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]); 

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3001/events/${id}`, values) 
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err));
    
  
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Event</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter event name"
                        value={values.name}
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                        value={values.description}
                        onChange={(e) => setValues({ ...values, description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nbTickets">nbTickets</label>
                    <input
                        type="number"
                        className="form-control"
                        id="nbTickets"
                        placeholder="Enter tickets number"
                        value={values.nbTickets}
                        onChange={(e) => setValues({ ...values, nbTickets: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Enter price"
                        value={values.price}
                        onChange={(e) => setValues({ ...values, price: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nbParticipants">nbParticipants</label>
                    <input
                        type="number"
                        className="form-control"
                        id="nbParticipants"
                        placeholder="Enter participants number"
                        value={values.nbParticipants}
                        onChange={(e) => setValues({ ...values, nbParticipants: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EditEvent;
