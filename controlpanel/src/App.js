import React from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import DashboardComponent from './components/DashboardComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />

        <Route element={<ProtectedRoutes/>}>
          <Route path="/Dashboard/*" element={<DashboardComponent/>} />
        </Route>
        <Route element={<PublicRoute/>}>
          <Route path="/Register" element={<RegisterComponent />} />
          <Route path="/Login" element={<LoginComponent />} />
        </Route>
      </Routes>
    </div>
  );
}

// function RequireAuth({ redirectTo }) {
//   let isAuthenticated = localStorage.getItem('accessToken');
//   return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
// }

export default App;
