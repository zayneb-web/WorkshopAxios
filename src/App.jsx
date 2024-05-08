import './App.css'
import Add from './components/addEvent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Events from './components/getAllevents'
import EditEvent from './components/editEvent'


function App() {

  return (
    <>
    
 <BrowserRouter>
      <Routes>
      <Route path="/" element={<Events/>}> </Route>
      <Route path="/edit/:id" element={<EditEvent />} />
       <Route path="/add" element={<Add/>}> </Route>
      </Routes>
      </BrowserRouter>    
      </>
  )
}

export default App
