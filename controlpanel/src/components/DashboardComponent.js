import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import BusForm from "./forms/BusForm";
import BusManager from "./managers/BusManager";
import ScheduleForm from "./forms/ScheduleForm";
import ScheduleManager from "./managers/ScheduleManager";
import StopForm from "./forms/StopForm";
import StopManager from "./managers/StopManager";
import RouteManager from "./managers/RouteManager";
import RouteForm from "./forms/RouteForm";


function DashboardComponent() {
  return (
    <div style={styles.dashContainer}>
      <NavbarComponent />
      <Routes>
        <Route path="/BusManager" element={<BusManager />} />
        <Route path="/BusForm" element={<BusForm />} />
        <Route path="/StopManager" element={<StopManager />} />
        <Route path="/StopForm" element={<StopForm />} />
        <Route path="/ScheduleManager" element={<ScheduleManager />} />
        <Route path="/ScheduleForm" element={<ScheduleForm />} />
        <Route path="/RouteManager" element={<RouteManager />} />
        <Route path="/RouteForm" element={<RouteForm />} />
        <Route path="/" element={<h1>Welcome to the Dashboard!</h1>} />
      </Routes>
    </div>
  );
}

export default DashboardComponent;

const styles = {
  dashContainer: {
    backgroundColor: "#879676",
    height: "100vh",
  },
};
