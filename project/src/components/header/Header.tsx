import { Link } from "react-router";
import Button from "../button/Button" /*"@/components/ui/button"*/;
import "./Header.css";
import logo from "../assets/logoteste.png";
const Header = () => {
  return (
    <div className="positionHeader">
      <header className="header">
        {/* Logo */}

        <Link to="/" className="logo">
          <img src={logo} alt="home" />
        </Link>

        {/* Navigation Buttons */}
        <nav className="nav">
          <Button variant="outline">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="outline">
            <Link to="/Login">Fazer o login</Link>
          </Button>
          <Button variant="outline">
            <Link to="/Shop">Shop</Link>
          </Button>
          <Button variant="outline">
            <Link to="/About">Blog</Link>
          </Button>
          <Button variant="outline">
            <Link to="/Account">Sua conta</Link>
          </Button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
