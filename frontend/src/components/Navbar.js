import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    position: 'relative',
    height: '10%',
    width: '100%',
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const img = {
    maxWidth: '100%',
    maxHeight: '100%',
    background: 'white',
    border: '2px black dotted',
    borderRadius: '30px'
  };

  const imgContainer = {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };

  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login'); // Redirect to the "/login" route
  };

  return (
    <div style={navStyle}>
      <div className="container" style={imgContainer}>
        <img style={img} src="mainlogo.png" alt="busicon" />
      </div>
      <div className="containers">
        {/* <Link to="/"><h2>TRACKING</h2></Link> */}
      </div>
      <div>
        <p>
          <a href="#" onClick={handleLoginClick}>
            Login
          </a>{' '}
          | <a>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
