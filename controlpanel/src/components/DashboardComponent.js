import React from "react";
import NavbarComponent from "./NavbarComponent";
import BusForm from "./forms/BusForm";
import ScheduleForm from "./forms/ScheduleForm";
import StopForm from "./forms/StopForm";
import RouteForm from "./forms/RouteForm";
import { Route, Routes } from "react-router-dom";

function DashboardComponent() {
  return (
    <div style={styles.dashContainer}>
      <NavbarComponent/>
        <Routes>
          <Route path="/BusManager" element={<BusForm/>}/>
          <Route path="/StopManager" element={<StopForm/>}/>
          <Route path="/ScheduleManager" element={<ScheduleForm/>}/>
          <Route path="/RouteManager" element={<RouteForm/>}/>
        </Routes>
    </div>
  );
}

export default DashboardComponent

const styles = {
  dashContainer:{
    backgroundColor: '#879676',
  }
}