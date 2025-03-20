import { Link } from "react-router";
import "./Navbar.css";
import logo from "../assets/logoteste.png";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="positionHeader">
      <header className="header">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="home" />
        </Link>
        {/* Navigation and Buttons */}
        <nav className="navCenter">
          <Link to="/" className="link">
            Home
          </Link>

          <Link to="/Login" className="link">
            Login
          </Link>

          <Link to="/About" className="link">
            About
          </Link>
        </nav>
        <nav className="navRight">
          <Link to="/Cart" className="link">
            <i className="fa-solid fa-shopping-cart text-green-500 text-2xl"></i>
          </Link>

          <Link to="/Suport" className="link">
            <i className="fa-solid fa-headset text-2xl cursor-pointer text-blue-500"></i>
          </Link>

          <div className="navbar-container">
            {/* Ícone do menu */}
            <i
              className="fa-solid fa-bars menu-icon"
              onClick={() => setIsOpen(true)}
            ></i>

            {/* Menu */}
            <div className={`navMenu ${isOpen ? "open" : ""}`}>
              {/* Cabeçalho do Menu */}
              <div className="navbar-header">
                <h2>Bem-vindo a Atlantis</h2>
                <i
                  className="fa-solid fa-xmark close-icon"
                  onClick={() => setIsOpen(false)}
                ></i>
              </div>

              {/* Itens do menu */}
              <div className="navbar-menu">
                <Link to="/" className="nav-menu-icon">
                  <i className="fa-solid fa-house text-2xl cursor-pointer text-blue-500"></i>
                  My House
                </Link>
                <Link to="/Login" className="nav-menu-icon">
                  <i className="fa-solid fa-right-to-bracket text-2xl cursor-pointer text-green-500"></i>
                  Make my register
                </Link>
                <Link to="/About" className="nav-menu-icon">
                  <i className="fa-solid fa-heart text-red-500 text-2xl"></i>
                  About the website
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
