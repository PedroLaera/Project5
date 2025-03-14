import { Link } from "react-router";
import Header from "../components/header/Header";
const Home = () => {
  return (
    <div>
      <Header />
      <button>
        <Link to="/Login">Fazer o login</Link>
      </button>
      <button>
        <Link to="/Shop">Comprar agora</Link>
      </button>

      {/*Produtos sendo puxados pela API do Back*/}
      <button>
        <h1>Produto de ID = 1</h1>
      </button>
      <button>
        <h1>Produto de ID = 2</h1>
      </button>
      <button>
        <h1>Produto de ID = 3</h1>
      </button>
    </div>
  );
};

export default Home;
