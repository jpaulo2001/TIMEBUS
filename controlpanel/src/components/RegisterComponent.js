import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function RegisterComponent() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("username")
    const email = formData.get("email");
    const phone = formData.get("mobile");
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");

    const loginData = {
      name,
      password,
      email,
      phone,
    };

    try { 

      if(password!==confirm_password){throw Error("Confirm password doesn't match the password")}

      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.ok) {
        const user = responseData;
        console.log("Register successful:", user);
        navigate("/Login");
      } else {
        console.log("Register failed:", responseData);
      }
    } catch (error) {console.log("Error:", error);}
  }



  return (
    <div>
      <h1>Registration Form</h1>
      <div id="container1">
          <img src="controlpanel\public\mainlogo.png" alt="" />
        </div>
      <form onSubmit={handleSubmit} id="registration-form" style={styles.RegistrationContainer}>
          <div style={styles.inputContainer}>
            <label htmlFor="username" style={styles.Typography}>Username:</label>
            <input type="text" id="username" name="username" required style={styles.inputField} />

            <label htmlFor="email" style={styles.Typography}>Email:</label>
            <input type="email" id="email" name="email" required style={styles.inputField} />

            <label htmlFor="mobile" style={styles.Typography}>Mobile Phone:</label>
            <input type="tel" id="mobile" name="mobile" required style={styles.inputField} />

            <label htmlFor="password" style={styles.Typography}>Password:</label>
            <input type="password" id="password" name="password" required style={styles.inputField} />

            <label htmlFor="confirm_password" style={styles.Typography}>Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" required style={styles.inputField} />
          </div>
          <button type="submit" style={styles.RegisterButton}>Register</button>
          <p>Already a user? Click <Link to="/Login">here to login</Link></p>
      </form>
    </div>
  );
}

const styles = {
  RegistrationContainer: {
    margin: "5%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "30px",
    padding: "5%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
  },
  
  Typography: {
    fontSize: "18px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  
  RegisterButton: {
    height: "40px",
    width: "120px",
    margin: "20px",
    backgroundColor: "#3498db",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },
  
  inputContainer: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "1fr 2fr",
  },
  
  inputField: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    height: "40px",
  },
  
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  }
  



}

export default RegisterComponent;
