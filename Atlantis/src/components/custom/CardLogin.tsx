import { Button } from "../ui/button";
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CardLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    try {
      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redireciona para a home
      navigate("/");
    } catch (error: any) {
      alert(
        error.response?.data?.error ||
          "Erro ao fazer login. Verifique suas credenciais."
      );
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="bg-zinc-100 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form className="mt-4" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            title="Email"
            placeholder="Digite seu email"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 ring-red-300"
                : "focus:ring-blue-500"
            }`}
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
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 ring-red-300"
                : "focus:ring-blue-500"
            }`}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Entrar
        </Button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Ainda não tem uma conta?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
}
