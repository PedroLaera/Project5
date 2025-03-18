import { Link } from "react-router";
import Navbar from "../../components/NavBar/Navbar";

const Shop = () => {
  return (
    <div>
      <Navbar />
      <h1>Comece a comprar</h1>
      <button>
        <Link to="/">Comece sua compra</Link>
      </button>
    </div>
  );
};

export default Shop;
