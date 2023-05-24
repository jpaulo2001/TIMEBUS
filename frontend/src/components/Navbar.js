import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
      <img src="mainlogo.png" alt="busicon"></img>
        <Link to="/"><h1>TIMEBUS</h1></Link>
      </div>
      <div className="containers">
        <Link to="/"><h2>TRACKING</h2></Link>
      </div>
    

    

    </header>
  )
}

export default Navbar