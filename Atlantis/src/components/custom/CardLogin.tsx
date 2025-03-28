import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";

export default function CardLogin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
  });

  const GetUsers = async () => {
    try {
      await api.get("/users", {
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        password: formData.password,
      });
    } catch (error) {
      console.error("Erro ao tentar fazer a requisição:", error);
    }
  };
  return (
    <div className="bg-zinc-100 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            title="Email"
            placeholder="Digite seu email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Senha</label>
          <input
            type="password"
            title="Senha"
            placeholder="Digite sua senha"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Link to="/" className="text-white">
            <p className="text-white">Entrar</p>
          </Link>
        </Button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Ainda não tem uma conta?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline"
          onClick={GetUsers}
        >
          Cadastre-se
        </a>
      </p>
    </div>
  );
}

/*

*/
