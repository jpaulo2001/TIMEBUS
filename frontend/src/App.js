import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MapContainer from './components/MapContainer';
import WorkoutForm from './components/WorkoutForm';

function App() {
  return (
      <div className="App">
        <MapContainer />
        <div id="leftBar">
          <Navbar/>
          <WorkoutForm/>
        </div>
      </div>
  );
}

export default App;