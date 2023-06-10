import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function LoginComponent() {

  const navigate = useNavigate();
  
  const login = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("email");
    const password = formData.get("password");
  
    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method:   "POST",
        headers:  {"Content-Type": "application/json",},
        body: JSON.stringify(loginData),});

      if (response.ok) {
        const user = await response.json();
        console.log("Login successful:", user);
        localStorage.setItem('jwt',user.token)
        navigate("/Dashboard");
      } else {
        const errorData = await response.json();
        console.log("Login failed:", errorData);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={login} id="login-form" style={styles.LoginContainer}>
        <div style={styles.formGroup}>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.Typography}>
              Email:
            </label>
            <input type="text" id="email" name="email" required style={styles.inputField} />
            <label htmlFor="password" style={styles.Typography}>
              Password:
            </label>
            <input type="password" id="password" name="password" required style={styles.inputField} />
          </div>
        </div>
        <button type="submit" style={styles.LoginButton}>
          Login
        </button>
        <p>
          Not a user? Click <Link to="/Register">here to register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginComponent;

const styles = {
  LoginContainer: {
    margin: "25%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "black",
    borderWidth: "2px",
    borderStyle: "dashed",
    borderRadius: "30px",
    padding: "5%",
  },
  Typography: {
    fontSize: "100%",
    fontFamily: "American Typewriter",
  },
  LoginButton: {
    height: "50px",
    width: "100px",
    margin: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "100%",
    fontFamily: "American Typewriter",
  },
  inputContainer: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "1fr 2fr",
  },
  inputField: {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "100%",
    fontFamily: "American Typewriter",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
};
