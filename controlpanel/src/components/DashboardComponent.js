import React from "react";
import NavbarComponent from "./NavbarComponent";
import BusForm from "./forms/BusForm";
import { Route, Routes } from "react-router-dom";

function DashboardComponent() {
  return (
    <div style={styles.dashContainer}>
      <NavbarComponent/>
        <Routes>
          <Route path="/BusManager" element={<BusForm/>}/>
          <Route path="/StopManager" element={<BusForm/>}/>
          <Route path="/ScheduleManager" element={<BusForm/>}/>
          <Route path="/RouteManager" element={<BusForm/>}/>
        </Routes>
    </div>
  );
}

export default DashboardComponent

const styles = {
  dashContainer:{
    backgroundColor: '#879676#879676#879676',
  }
}