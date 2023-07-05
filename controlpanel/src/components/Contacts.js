import React from "react";
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


function ContactList() {
  return (
    <div>
      <h1>Contatos</h1>
      <div style={styles.ContactContainer}>
        <div style={styles.Contact}>
          <h3 style={styles.ContactName}>Varela</h3>
          <p style={styles.Telephone}><FontAwesomeIcon icon={faPhone} style={styles.icon}/> Telemovel:<a href="tel:+11234567890"> 91983212</a></p>
          
          
        </div>
        <div style={styles.Contact}>
          <h3 style={styles.ContactName}>CRP</h3>
          <p style={styles.Telephone}><FontAwesomeIcon icon={faPhone} style={styles.icon}/> Telemovel:<a href="tel:+11234567890"> 91983212</a></p>
          
        </div>
        <div style={styles.Contact}>
          <h3 style={styles.ContactName}>Autoviacao</h3>
          <p style={styles.Telephone}><FontAwesomeIcon icon={faPhone} style={styles.icon}/> Telemovel:<a href="tel:+11234567890"> 91983212</a></p>
        </div>
      </div>
    </div>
  );
}

export default ContactList;

const styles = {
  ContactContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    listStyle: "none",
  },
  Contact: {
    width:"150%",
    margin: "5%",
    padding: "10%",
    borderColor: "black",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  },
  ContactName: {
    fontSize: "20px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  Telephone: {
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
  },

};
