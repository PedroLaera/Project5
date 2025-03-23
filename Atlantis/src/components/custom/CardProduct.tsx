import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
}

const Products = {
  ProductCard: ({ id, name, price, image }: ProductCardProps) => (
    <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-60 h-80 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-xl text-green-600 mt-2">{price}</p>
      <Link
        to={`/product/${id}`}
        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Ver Detalhes
      </Link>
    </div>
  ),

  ValuesProductCard: ({ id, name, price, image }: ProductCardProps) => (
    <div className="bg-red-600 p-6 rounded-lg shadow-lg transition transform hover:scale-105 text-white">
      <img
        src={image}
        alt={name}
        className="w-60 h-80 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-xl mt-2">{price}</p>
      <Link
        to={`/product/${id}`}
        className="mt-4 inline-block px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-300 transition"
      >
        Ver Detalhes
      </Link>
    </div>
  ),

  // Adicione novas funções aqui para criar outros componentes personalizados
};

export const { ProductCard, ValuesProductCard } = Products;
