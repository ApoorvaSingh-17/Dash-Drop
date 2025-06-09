import "/src/App.css"
import logo from "../assets/logoImg.png"
import { Link } from 'react-router-dom';
const Navbar = () => {
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
                    <Link className="nav-link fs-4 text-dark" to="/adminLogin">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fs-4 text-dark" to="/adminRegister">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fs-4 text-dark" to="/update">
                        Update
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fs-4 text-dark" to="/orders">
                        Orders
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fs-4 text-dark" to="/approval">
                        Approval
                    </Link>
                </li>
            </ul>
        </div>


    )
}
export default Navbar