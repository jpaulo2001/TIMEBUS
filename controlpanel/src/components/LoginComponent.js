import React from "react";

function LoginComponent() {
  return (
    <div>
      <h1>Login Form</h1>
      <form action="http://127.0.0.1:8020/api/auth/login" method="POST" id="login-form" style={styles.LoginContainer}>
      <div style={styles.formGroup}>
        <div style={styles.inputContainer}>
          <label for="email" style={styles.Typography}>Email:</label>
          <input type="text" id="email" name="email" required style={styles.inputField}/>
          <label for="password" style={styles.Typography}>Password:</label>
          <input type="password" id="password" name="password" required style={styles.inputField}/>
        </div>
      </div>
        <button type="submit" style={styles.LoginButton} action="http://localhost:8020/api/auth/login" method="POST">Login</button>
        <p>Not a user? Click <a href="register.html">here to register</a></p>
      </form>
    </div>
    
  );
}

export default LoginComponent

const styles = {
  LoginContainer:{
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
  LoginButton:{
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
    padding: '5px',
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