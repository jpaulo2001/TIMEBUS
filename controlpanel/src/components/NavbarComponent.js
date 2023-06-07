import React from "react";

function navbarComponent() {
  return (
    <div style={styles.navBarContainer}>
        <input type="button" value="Bus Manager" style={styles.button}/>
        <input type="button" value="Stop Manager" style={styles.button}/>
        <input type="button" value="Schedule Manager" style={styles.button}/>
        <input type="button" value="Route Manager" style={styles.button}/>
    </div>
  );
}

export default navbarComponent

const styles = {
    button:{
        height: '60px',
        width: '150px',
        margin: '5px',
        borderRadius: '15px',
        backgroundColor: '#c6cca5',
        fontSize: '90%',
        fontFamily: 'American Typewriter',
        borderColor: 'black'
    },
    navBarContainer:{
        backgroundColor:'#8ab8a8',
        borderRadius: '30px',
        borderStyle: 'dashed',
        borderWidth: '3px'
    },
    Typography:{
        
    },
}