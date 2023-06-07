import React from "react";

function RegisterComponent() {
  return (
    <div>
      <h1>Registration Form</h1>
      <form action="http://localhost:8020/api/auth/register" method="POST" id="registration-form" style={styles.RegistrationContainer}>
          <ul>            
            <div style={styles.inputContainer}>
              <label for="email" style={styles.Typography}>Email:</label>
              <input type="email" id="email" name="email" required style={styles.inputField}/>
              <label for="password" style={styles.Typography}>Password:</label>
              <input type="password" id="password" name="password" required style={styles.inputField}/>
              <label for="confirm_password" style={styles.Typography}>Confirm Password:</label>
              <input type="password" id="confirm_password" name="confirm_password" required style={styles.inputField}/>
            </div>
              <button type="submit" action="/http://localhost:8020/api/auth/register" method="POST" style={styles.RegisterButton}>Register</button>
          </ul>
      </form>
    </div>
  );
}

const styles = {
    RegistrationContainer:{
      margin: '25%',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: '2px',
      borderStyle: 'dashed',
      borderRadius:'30px',
      padding: '5%'
    },
    Typography:{
      fontSize: '100%',
      fontFamily: 'American Typewriter',
    },
    RegisterButton:{
      height: '50px',
      width: '100px',
      margin: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '100%',
      fontFamily: 'American Typewriter',
    },
    inputContainer:{
      display: 'grid',
      gap: '10px',
      gridTemplateColumns: '1fr 2fr',
    },
    inputField: {
      padding: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '100%',
      fontFamily: 'American Typewriter',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
    },
  }

export default RegisterComponent