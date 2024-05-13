import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteEvent, getallEvents } from '../service/api';
import { Card, Button, Table } from 'react-bootstrap';
import NavigationBar from './NavigationBar';

const Events = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getallEvents()
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(id)
                .then(() => {
                    getallEvents()
                        .then(res => setData(res.data))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <>
        <NavigationBar/>
        <div className="container mt-4">
            <h1 className="text-center mb-4">List of Events</h1>
            <Card>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Number of Tickets</th>
                                <th>Price</th>
                                <th>Number of Participants</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>{event.name}</td>
                                    <td>{event.description}</td>
                                    <td>{event.nbTickets}</td>
                                    <td>{event.price}</td>
                                    <td>{event.nbParticipants}</td>
                                    <td>
                                        <Link to={`/edit/${event.id}`} className="btn btn-primary me-2">Update</Link>
                                        <button onClick={() => handleDelete(event.id)} >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
        </>
    );
};

export default Events;
