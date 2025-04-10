import { useEffect, useState } from "react";
import { ProductCard } from "../components/custom/CardProduct";
import Footer from "../components/custom/Footer";
import { api } from "../services/api";

interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  ID_category?: number;
  category_name?: string; // Se estiver usando nome de categoria
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-zinc-900 p-4">
      <h1 className="text-4xl font-thin text-gray-100">Welcome to Atlantis</h1>
      <p className="text-gray-500 mt-2">Explore our product diversity!</p>

      {/* Carroussel */}

      <p className="text-4xl font-thin text-gray-100 mt-8">Our best offers!</p>

      {/* Card dos produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product.id_product}
            id_product={product.id_product}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
