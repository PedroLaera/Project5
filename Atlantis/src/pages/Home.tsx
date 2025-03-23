import { ProductCard } from "../components/custom/CardProduct";
import img2 from "../components/assets/img2.jpg";
import img1 from "../components/assets/img3.webp";
import img3 from "../components/assets/img1.jpg";

const products = [
  { id: "1", name: "Notebook Gamer", price: "R$ 5.000", image: img2 },
  { id: "2", name: "Smartphone", price: "R$ 2.500", image: img1 },
  { id: "3", name: "Headset Bluetooth", price: "R$ 300", image: img3 },
];

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800">Bem-vindo à Home</h1>
      <p className="text-gray-600 mt-2">Explore nossos produtos incríveis!</p>

      {/* Card dos produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
