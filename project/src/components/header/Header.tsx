import { Link } from "react-router";
import Button from "../button/Button" /*"@/components/ui/button"*/;
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">MyLogo</div>

      {/* Navigation Buttons */}
      <nav className="nav">
        <Button variant="outline">Home</Button>
        <Button variant="outline">
          <Link to="/Login">Fazer o login</Link>
        </Button>
        <Button variant="outline">Services</Button>
        <Button variant="outline">Contact</Button>
      </nav>
    </header>
  );
};

export default Header;
