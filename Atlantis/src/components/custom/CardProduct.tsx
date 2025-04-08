import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import users from "../data/users"; // Supondo que os usuários estejam armazenados aqui

interface ProductCardProps {
  id_product: number;
  name: string;
  price: number;
}

export function ProductCard({ id_product, name, price }: ProductCardProps) {
  const image = `../assets/${id_product}.jpg`; // caminho baseado no id

  return (
    <div className="bg-zinc-900 p-6 rounded-lg transition transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-60 h-70 object-cover rounded-lg mb-4"
        onError={(e) => (e.currentTarget.src = "/images/products/default.jpg")} // imagem padrão caso não exista
      />
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-xl text-white mt-2 font-thin">R$ {price}</p>
      <Link
        to={`/product/${id_product}`}
        className="mt-4 text-white! border-1 inline-block px-6 py-3 bg-zinc-900 rounded-lg hover: transition"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}

export default function ProductCardPage({
  id_product,
  name,
  price,
}: ProductCardProps) {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === paramId || p.id === id_product);
  const user = users.find((u) => u.id === "1"); // Simulando o usuário logado

  const [quantity, setQuantity] = useState(1);

  if (!product || !user) {
    return (
      <div className="text-center text-2xl text-red-500">
        Produto ou usuário não encontrado
      </div>
    );
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (
    parseFloat(product.price.replace("R$ ", "")) * quantity
  ).toFixed(2);

  return (
    <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
      {/* Imagem do produto */}
      <img
        src={product.image}
        alt={name}
        className="w-60 h-80 object-cover rounded-lg mb-4 md:mb-0 md:mr-8"
      />

      {/* Informações do produto */}
      <div className="flex flex-col justify-between w-full md:ml-8">
        {" "}
        {/* Espaçamento entre a imagem e as informações */}
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{product?.description}</p>
        <p className="text-xl text-green-600 mt-2">Valor Unitário: {price}</p>
        {/* Seção de quantidade */}
        <div className="flex items-center mt-4">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            -
          </button>
          <span className="px-4 text-lg">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            +
          </button>
        </div>
        <p className="text-xl font-semibold text-gray-800 mt-4">
          Total: R$ {totalPrice}
        </p>
        {/* Endereço do usuário */}
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold">Endereço de Entrega</h3>
          <p>{user?.address}</p>
        </div>
        {/* Botão de compra */}
        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}
