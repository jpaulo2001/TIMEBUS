import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import BusTimetable from './components/BusTimetable';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
            <BusTimetable />
        </BrowserRouter>
      </div>
  );
}

export default App;
