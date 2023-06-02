import { Link } from 'react-router-dom'

const Navbar = () => {

  const navStyle={
    position: 'relative',
    height: '10%',
    width: '100%',
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const img = {
    maxWidth: '100%',
    maxHeight: '100%',
  }

  const imgContainer = {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }

  return (
    <div style={navStyle}>
      <div className="container" style={imgContainer}>
      <img style={img} src="mainlogo.png" alt="busicon"></img>
        {/* <Link to="/"><h1>TIMEBUS</h1></Link> */}
      </div>
      <div className="containers">
        {/* <Link to="/"><h2>TRACKING</h2></Link> */}
      </div>
    </div>
  )
}

export default Navbar