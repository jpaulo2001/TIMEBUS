import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import DashboardComponent from './components/DashboardComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path='/*' element={<PrivateRoute />}>
          <Route exact path='/*' element={<DashboardComponent />} />
        </Route> */}
        <Route path="/" element={<PrivateRoute component={DashboardComponent} />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </div>
  );
}

export default App;
