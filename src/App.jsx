import './App.css'
import Add from './components/addEvent'
import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom'
import Events from './components/getAllevents'
import EditEvent from './components/editEvent'
import { useDispatch } from 'react-redux'
import { Suspense } from 'react'
import React from 'react'
import { fetchEvents } from './redux/slices/eventsSlice.js'
import AddEventR from './componentsRedux/AddEventRedux.jsx'
import EventDetails from './componentsRedux/EventDetails.jsx'

function App() {

  //use Lazy Loading
const EventsRedux = React.lazy(() => import("./componentsRedux/ListEventsRdeux.jsx"));
const NotFound = React.lazy(() => import("./components/NotFound.jsx"));
const dispatch = useDispatch();

  return (
    <>
     <Suspense fallback={<p>Loading ....</p>}>
 <BrowserRouter>
      <Routes>
   
      <Route path="/" element={<Events/>}> </Route>
      <Route path="/events" element={<EventsRedux />}  loader={() => import("./componentsRedux/ListEventsRdeux.jsx")} />
      <Route path="/edit/:id" element={<EditEvent />} />
       <Route path="/add" element={<Add/>}> </Route>
       <Route path="/events/addEventRedux" element={<AddEventR/>}> </Route>
       <Route path="/events/:eventTitle" element={<EventDetails />} />
       <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter> 
      </Suspense>   
      </>
  )
}

export default App
