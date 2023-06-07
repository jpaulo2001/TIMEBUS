import './App.css';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import DashboardComponent from './components/DashboardComponent';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<LoginComponent/>}/>
        <Route path="/Register" element={<RegisterComponent/>}/>
        <Route path="/Home" element={<DashboardComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
