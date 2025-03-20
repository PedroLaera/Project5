import { Link } from "react-router";
import Navbar from "../../components/NavBar/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <button>
          <Link to="/Product">Comprar agora</Link>
        </button>

        {/*Produto inicial*/}
        <button>
          <Link to="/Product">Know more</Link>
        </button>
        {/*Carrossel*/}

        {/*Products*/}

        {/*Produtos sendo puxados pela API do Back*/}
        {/*<button onClick={() => fetchData("id: 1")}>Carrossel 1</button>
        <button onClick={() => fetchData("id: 2")}>Carrossel 2</button>
        <button onClick={() => fetchData("id: 3")}>Carrossel 3</button>*/}

        {/*Produto final*/}
        <button>
          <Link to="/Product">Know more</Link>
        </button>
      </div>
      *
    </div>
  );
};

export default Home;
