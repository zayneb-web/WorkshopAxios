import React, { useEffect, useState, useRef } from "react";
import { Button, Form } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEventThunk } from "../redux/slices/eventsSlice";

function AddEventR() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [newEvent , setNewEvent] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        isLiked: false,
        nbParticipants: 0,
        nbTickets: 0,
        img: '' 
    });
    const dispatch = useDispatch();
    const formRef = useRef(null); // Create a ref for the form element

    useEffect(() => {
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value; 
        setNewEvent(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(addEventThunk(newEvent))
            .then(() => {
                navigate('/events');
            })
            .catch(() => { 
                setErrorMessage('Failed to add the event. Please try again.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return(
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Form.Field>
                <label>Event Name:</label>
                <input
                    type="text"
                    name="name"
                    value={newEvent.name}
                    onChange={handleChange}
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>Image:</label>
                <input
                    type="file" // Set type as "file" for image uploading
                    name="img"
                    accept="images" // Specify accepted file types as images
                    onChange={handleChange}
                />
            </Form.Field>
            {/* Include other fields like date, time, etc., similar to the above */}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Event'}
            </Button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Form>
    );
}

export default AddEventR;
