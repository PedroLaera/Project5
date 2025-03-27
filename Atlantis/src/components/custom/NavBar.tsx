import { Menu, Home, User, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false); // Estado para animação de saída
  const navigate = useNavigate(); // Hook para navegação

  // Adiciona a animação de itens ao carregar a página
  useEffect(() => {
    setAnimationTriggered(true);
  }, []);

  // Função para navegação com animação
  const handleNavigation = (path: string) => {
    setExitAnimation(true); // Ativa a animação de saída
    setTimeout(() => {
      navigate(path); // Navega para a nova rota após a animação
    }, 500); // Tempo de duração da animação (ajustável)
  };

  return (
    <nav className="w-full bg-zinc-900 shadow-md p-4 flex items-center justify-between text-white">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
          <h1
            className={`text-xl font-bold ${
              animationTriggered ? "animate-fadeInDown" : "opacity-0"
            } transition-all duration-500`}
          >
            <Link to="/">
              <img src={logo} alt="logo" className="w-50 h-8" />
            </Link>
          </h1>
        </div>

        <ul className="hidden md:flex gap-4">
          <li
            className={`${
              animationTriggered ? "animate-fadeInDown" : "opacity-0"
            } transition-all duration-500`}
          >
            <Link
              to="/"
              className="flex items-center gap-1 text-white! hover:text-gray-300 transition-all duration-300"
            >
              <Home className="w-5 h-5" /> Home
            </Link>
          </li>
          <li
            className={`${
              animationTriggered ? "animate-fadeInDown" : "opacity-0"
            } transition-all duration-500 delay-100`}
          >
            <Link
              to="/login"
              className="flex items-center gap-1 text-white! hover:text-gray-300 transition-all duration-300"
            >
              <User className="w-5 h-5" /> Login
            </Link>
          </li>
          <li
            className={`${
              animationTriggered ? "animate-fadeInDown" : "opacity-0"
            } transition-all duration-500 delay-200`}
          >
            <Link
              to="/addproduct"
              className="flex items-center gap-1 text-white! hover:text-gray-300 transition-all duration-300"
            >
              <Key className="w-5 h-5" /> + Product
            </Link>
          </li>
          <li
            className={`${
              animationTriggered ? "animate-fadeInDown" : "opacity-0"
            } transition-all duration-500 delay-300`}
          >
            <Link
              to="/teste"
              className="flex items-center gap-1 text-white! hover:text-gray-300 transition-all duration-300"
            >
              <Key className="w-5 h-5" /> Developer
            </Link>
          </li>
        </ul>

        <div
          className={`hidden md:block ${
            animationTriggered ? "animate-fadeInDown" : "opacity-0"
          } transition-all duration-500 delay-400`}
        >
          <Link
            to="/profile"
            className="px-6 py-2 text-white! rounded-lg hover: transition"
            onClick={() => handleNavigation("/profile")}
          >
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-900 shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-4 w-full">
            <li
              className={`${
                animationTriggered ? "animate-fadeInDown" : "opacity-0"
              } transition-all duration-500`}
            >
              <Link
                to="/"
                className="flex items-center gap-1 text-white hover:text-gray-300 transition-all duration-300"
              >
                <Home className="w-5 h-5" /> Home
              </Link>
            </li>

            <li
              className={`${
                animationTriggered ? "animate-fadeInDown" : "opacity-0"
              } transition-all duration-500 delay-200`}
            >
              <Link
                to="/profile"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Acessar Perfil
              </Link>
              <li
                className={`${
                  animationTriggered ? "animate-fadeInDown" : "opacity-0"
                } transition-all duration-500 delay-100`}
              >
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-white hover:text-gray-300 transition-all duration-300"
                >
                  <User className="w-5 h-5" /> Login
                </Link>
              </li>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
