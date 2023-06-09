import './App.css';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import DashboardComponent from './components/DashboardComponent';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Dashboard/*" element={<DashboardComponent/>}/>
        <Route path="/Register" element={<RegisterComponent/>}/>
        <Route path="/" element={<LoginComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
