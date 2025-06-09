import "/src/App.css"
import logo from "../assets/logoImg.png"
import { Link } from 'react-router-dom';
const LandingNavbar = () => {
  return (
    <div className="navbar">
      <img className="logoimg" src={logo} alt="logo" />
      <ul className="nav  justify-content-end ">
        <li className="nav-item">
          <Link className="nav-link fs-4 text-dark" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link fs-4 text-dark" href="/about">About</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-4 text-dark" to="/admin">
            Admin
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-4 text-dark" to="/userLand">
            User
          </Link>
        </li>
      </ul>
    </div>


  )
}
export default LandingNavbar