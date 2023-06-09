import React from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import DashboardComponent from './components/DashboardComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<PrivateRoute component={DashboardComponent} />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes> */}

      {/* <Switch>
      <Route path="/register">
        <RegisterComponent />
      </Route>
      <Route path="/login">
        <LoginComponent />
      </Route>
      <Route
        path="/"
        render={() => (
          <PrivateRoute redirectTo="/login">
            <DashboardComponent />
          </PrivateRoute>
        )}
      />
    </Switch> */}

    <Routes>
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/login" element={<LoginComponent />} />

      <Route path="/" element={<RequireAuth redirectTo="/login" />}>
        <Route index element={<DashboardComponent />} />
      </Route>
    </Routes>

    </div>
  );
}

function RequireAuth({ redirectTo }) {
  let isAuthenticated = localStorage.getItem('accessToken');
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default App;
