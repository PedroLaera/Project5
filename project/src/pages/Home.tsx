import { Link } from "react-router";
import Header from "../components/header/Header";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <button>
          <Link to="/Login">Comprar agora</Link>
        </button>

        {/*Produto inicial*/}
        <button>
          <Link to="/Shop">Know more</Link>
        </button>

        {/*Produtos sendo puxados pela API do Back*/}
        <button onClick={() => fetchData("id: 1")}>Carrossel 1</button>
        <button onClick={() => fetchData("id: 2")}>Carrossel 2</button>
        <button onClick={() => fetchData("id: 3")}>Carrossel 3</button>

        {/*Produto final*/}
        <button>
          <Link to="/Shop">Know more</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
