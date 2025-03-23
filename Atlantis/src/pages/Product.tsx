import { useParams } from "react-router-dom";
import img2 from "../assets/img2.jpg";
import img1 from "../assets/img3.webp";
import img3 from "../assets/img1.jpg";

const products = [
  {
    id: "1",
    name: "Notebook Gamer",
    price: "R$ 5.000",
    image: img2,
    description: "Alto desempenho para jogos e trabalho.",
  },
  {
    id: "2",
    name: "Smartphone",
    price: "R$ 2.500",
    image: img1,
    description: "Câmera poderosa e bateria de longa duração.",
  },
  {
    id: "3",
    name: "Headset Bluetooth",
    price: "R$ 300",
    image: img3,
    description: "Qualidade de som incrível e conexão estável.",
  },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id); // Filtra o produto correto

  if (!product) {
    return (
      <div className="text-center text-2xl text-red-500">
        Produto não encontrado
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row max-w-5xl">
        {/* Imagem do Produto */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-md"
        />

        {/* Informações do Produto */}
        <div className="md:ml-10 flex flex-col justify-center text-center md:text-left mt-6 md:mt-0">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-3">{product.description}</p>
          <p className="text-3xl font-semibold text-green-600 mt-5">
            {product.price}
          </p>

          <button className="mt-8 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md">
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
