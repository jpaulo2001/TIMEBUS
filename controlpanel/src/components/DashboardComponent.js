import React from "react";
import NavbarComponent from "./NavbarComponent";
import BusForm from "./forms/BusForm";
import BusManager from "./managers/BusManager"
import ScheduleForm from "./forms/ScheduleForm";
import StopForm from "./forms/StopForm";
import RouteForm from "./forms/RouteForm";
import { Route, Routes, useRoutes } from "react-router-dom";

function DashboardComponent() {
  let element = useRoutes([
    { path: '/BusManager', element: <BusManager/> },
    { path: '/StopManager', element: <StopForm/> },
    { path: '/ScheduleManager', element: <ScheduleForm/> },
    { path: '/RouteManager', element: <RouteForm/> },
  ]);

  return (
    <div style={styles.dashContainer}>
      <NavbarComponent/>
      {element}
    </div>
  );
}

export default DashboardComponent

const styles = {
  dashContainer:{
    backgroundColor: '#879676',
  }
}