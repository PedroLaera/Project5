import { Link } from "react-router";
import Navbar from "../../components/NavBar/Navbar";

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Crie sua conta</h1>
        <button>
          <Link to="/Login">Login completo</Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
