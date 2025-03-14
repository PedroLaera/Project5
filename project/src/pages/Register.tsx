import { Link } from "react-router";
import Header from "../components/header/Header";

const Register = () => {
  return (
    <div>
      <Header />
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
