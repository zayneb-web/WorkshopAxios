import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {getallEvents} from "../service/api.js";



function EventDetails(props) {
  const {id} = useParams();
  const [event, setEvent] = useState(null);
  const [isLiked, SetIsLike] = useState(false);
  const [nbParticipants, setNbParticipants] = useState(null);
  const [img, setImg] = useState(null);
  const [nbTickets, setNbTickets] = useState(null);


  useEffect(() => {
    fetchone() ;
  }, []);

  const fetchone = async () => {
    try {
      const response = await getallEvents(id);
      if (response && response.data) {
        setEvent(response.data);
        console.log("Event data:", response.data);
      } else {
        console.error("Invalid event data:", response);
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };
  
  const handleLikeState = () => {
    SetIsLike(!isLiked);
  };


  const bookEvent = () => {
    setNbParticipants(nbParticipants + 1);
    setNbTickets(nbTickets - 1);
    if (nbTickets === 1) {
      console.log("changing image");
      setImg("sold_out.png");
    }
    alert("You have booked an event");
  };


  if (!event) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className="max-w-sm p-6 text-left bg-white border border-gray-200 rounded-lg shadow">
        <img
          className="w-full h-45"
          src={`../images/${event.img}`}
          alt="image-event"
        />

        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{event.name}</h2>
          <p className="text-gray-700 text-base">Price: {event.price}</p>
          <div className="pt-4 pb-2">
            <p>Number of tickets: {event.nbTickets}</p>
            <p>Number of Participants: {event.nbParticipants}</p>
          </div>
          <button
            onClick={() => bookEvent()}
            disabled={nbTickets === 0}
            className=" inline-flex items-center  px-3 py-2 text-sm  text-center  bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
          >
            Book an event
          </button>
          <button
            onClick={() => handleLikeState()}
            className=" ml-3 inline-flex items-center  px-3 py-2 text-sm  text-center  bg-blue-400  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300bg-blue-500  text-white font-bold  rounded"
          >
            {isLiked ? "Dislike" : "Like"}
          </button>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
