import { Link } from "react-router";
import Header from "../components/header/Header";

const Shop = () => {
  return (
    <div>
      <Header />
      <h1>Comece a comprar</h1>
      <button>
        <Link to="/">Comece sua compra</Link>
      </button>
    </div>
  );
};

export default Shop;
