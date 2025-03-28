import { ProductCard } from "../components/custom/CardProduct";
import img2 from "../components/assets/img2.jpg";
import img1 from "../components/assets/img3.webp";
import img3 from "../components/assets/img1.jpg";
import Carroussel from "../components/custom/Carroussel";
import Footer from "../components/custom/Footer";

const products = [
  { id: "1", name: "Notebook Gamer", price: "R$ 5.000", image: img2 },
  { id: "2", name: "Smartphone", price: "R$ 2.500", image: img1 },
  { id: "3", name: "Headset Bluetooth", price: "R$ 300", image: img3 },
];

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-zinc-900 p-4">
      <h1 className="text-4xl font-thin text-gray-100">Welcome to Atlantis</h1>
      <p className="text-gray-500 mt-2">Explore our product diversity!</p>
      {/* Carroussel*/}
      <Carroussel />

      <p className="text-4xl font-thin text-gray-100">Our best offers!</p>

      {/* Card dos produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products.map((products) => (
          <ProductCard key={products.id} {...products} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
