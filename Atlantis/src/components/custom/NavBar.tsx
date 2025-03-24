import { Menu, Home, User, Key } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
          <h1 className="text-xl font-bold color-blue-600">
            <Link to="/">Atlantis</Link>
          </h1>
        </div>

        <ul className="hidden md:flex gap-4">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <Home className="w-5 h-5" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <User className="w-5 h-5" /> Login
            </Link>
          </li>
          <li>
            <Link
              to="/addproduct"
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <Key className="w-5 h-5" /> + Product
            </Link>
          </li>
          <li>
            <Link
              to="/teste"
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <Key className="w-5 h-5" /> Developer
            </Link>
          </li>
        </ul>

        <div className="hidden md:block">
          <Link
            to="/profile"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Acessar Perfil
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-4 w-full">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1 text-gray-700 hover:text-black"
              >
                <Home className="w-5 h-5" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-black"
              >
                <User className="w-5 h-5" /> Login
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Acessar Perfil
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
