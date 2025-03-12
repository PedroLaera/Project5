import { Link } from "react-router";
import Header from "../components/header/Header";

const Register = () => {
  return (
    <div>
      <Header />
      <h1>Crie sua conta</h1>
      <button>
        <Link to="/">Comece sua compra</Link>
      </button>
    </div>
  );
};

export default Register;
