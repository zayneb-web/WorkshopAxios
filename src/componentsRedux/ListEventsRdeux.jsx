import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";
import { useEffect } from "react";
import { fetchEvents, selectEvents } from "../redux/slices/eventsSlice";
import MyEvent from "./MyEvent.jsx";

function EventsRdeux() {
    const dispatch = useDispatch();
    const [events, errors] = useSelector(selectEvents);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    useEffect(() => {
        if (errors) {
            console.error("Error fetching events:", errors);
        }
    }, [errors]);

    console.log("Events:", events);

    return(
        <>
            <NavigationBar />
            <h1 className="font-bold text-3xl">Events List</h1>
            <div className="flex mt-4 p-5 space-x-5">
                {Array.isArray(events) && events.map((e, i) => (
                    <MyEvent
                        id={e.id}
                        img={e.img}
                        name={e.name}
                        price={e.price}
                        key={i}
                        nbTickets={e.nbTickets}
                        nbParticipants={e.nbParticipants}
                    />
                ))}
            </div>
        </>
    )
}

export default EventsRdeux;
