import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
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
  );
}
