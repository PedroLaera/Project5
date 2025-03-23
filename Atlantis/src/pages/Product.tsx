import { useParams } from "react-router-dom";
import products from "../data/products"; // Importando os produtos
import {
  ProductCard,
  ValuesProductCard,
} from "../components/custom/CardProduct"; // Importando os cards

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
      {/* Aqui você pode escolher qual card usar */}
      <ProductCard
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
      />

      {/* Se quiser testar o card vermelho, troque para `RedProductCard` */}
      <ValuesProductCard
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
      />
    </div>
  );
}
