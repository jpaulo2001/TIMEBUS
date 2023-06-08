import React from "react";
import NavbarComponent from "./NavbarComponent";
import BusForm from "./forms/BusForm";
import BusManager from "./managers/BusManager"
import ScheduleForm from "./forms/ScheduleForm";
import ScheduleManager from "./managers/ScheduleManager"
import StopForm from "./forms/StopForm";
import StopManager from "./managers/StopManager";
import RouteManager from "./managers/RouteManager"
import RouteForm from "./forms/RouteForm";
import { Route, useRoutes } from "react-router-dom";

function DashboardComponent() {
  let element = useRoutes([
    { path: '/BusManager', element: <BusManager/> },
    { path: '/BusForm', element: <BusForm/> },
    { path: '/StopManager', element: <StopManager/> },
    { path: '/StopForm', element: <StopForm/> },
    { path: '/ScheduleManager', element: <ScheduleManager/> },
    { path: '/ScheduleForm', element: <ScheduleForm/> },
    { path: '/RouteManager', element: <RouteManager/> },
    { path: '/RouteForm', element: <RouteForm/> },

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