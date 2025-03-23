import { useParams } from "react-router-dom";
import products from "../components/data/products"; // Importando os produtos
import ProductCardPage from "../components/custom/CardProduct"; // Importando a página de cards

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id); // Filtra o produto pelo ID

  if (!product) {
    return (
      <div className="text-center text-2xl text-red-500">
        Produto não encontrado
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Passando as propriedades diretamente */}
      <ProductCardPage
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
      />
    </div>
  );
}
