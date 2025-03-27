import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

// Importação das imagens
import perfume1 from "../assets/img1.jpg";
import perfume2 from "../assets/img2.jpg";
import perfume3 from "../assets/img3.webp";

// Array de imagens de exemplo importadas
const images = [perfume1, perfume2, perfume3];
const productIds = [1, 2, 3]; // Supondo que os IDs dos produtos sejam 1, 2, 3, etc.

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Hook do React Router para navegação

  // Função para mudar a imagem para a próxima
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Função para mudar a imagem para a anterior
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Função para redirecionar para a página do produto ao clicar na imagem
  const handleImageClick = () => {
    const productId = productIds[currentIndex]; // Obtém o ID do produto baseado no índice
    navigate(`/products/${productId}`); // Redireciona para a página do produto
  };

  return (
    <div className="w-full max-w-8xl mx-auto mt-10 px-6 py-10">
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={images[currentIndex]} // Usando a variável da imagem importada
          alt={`Perfume ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
          onClick={handleImageClick} // Redireciona ao clicar na imagem
        />
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
          <Button
            variant="outline"
            className="bg-white! text-black hover:bg-gray-200"
            onClick={prevSlide}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            className="bg-white! text-black hover:bg-gray-200"
            onClick={nextSlide}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
