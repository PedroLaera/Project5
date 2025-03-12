import { Link } from "react-router";
import Button from "../button/Button" /*"@/components/ui/button"*/;
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}

      <button>
        <Link to="/">
          <img src="/project/public/vite.svg" alt="home" />
        </Link>
      </button>

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
          <Link to="/About">Sobre</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
