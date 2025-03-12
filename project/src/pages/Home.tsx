import { Link } from "react-router";
import Header from "../components/header/Header";
const Home = () => {
  return (
    <div>
      <Header />
      <button>
        <Link to="/Login">Fazer o login</Link>
      </button>
    </div>
  );
};

export default Home;
