import React from "react";
import NavbarComponent from "./NavbarComponent";
import BusForm from "./managers/BusForm";

function DashboardComponent() {
  return (
    <div style={styles.dashContainer}>
        <NavbarComponent/>
        <BusForm/>
    </div>
  );
}

export default DashboardComponent

const styles = {
  dashContainer:{
    backgroundColor: '#879676#879676#879676',
  }
}