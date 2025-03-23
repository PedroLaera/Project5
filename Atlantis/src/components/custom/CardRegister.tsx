import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function RegisterCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    cpf: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para validar CPF
  const isValidCPF = (cpf: string) => {
    return /^[0-9]{11}$/.test(cpf);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Nome completo é obrigatório.";
    if (!formData.email) newErrors.email = "Email é obrigatório.";
    if (!formData.password) newErrors.password = "Senha é obrigatória.";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirme sua senha.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "As senhas não coincidem.";
    if (!formData.address) newErrors.address = "Endereço é obrigatório.";
    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório.";
    else if (!isValidCPF(formData.cpf))
      newErrors.cpf = "CPF inválido. Deve conter 11 números.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Usuário registrado:", formData);
      navigate("/login"); // Redireciona para login após o registro
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Seu Cadastro
      </h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Nome Completo</label>
          <input
            type="text"
            name="fullName"
            placeholder="Digite seu nome completo"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Confirmar Senha</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Endereço</label>
          <input
            type="text"
            name="address"
            placeholder="Digite seu endereço"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">CPF</label>
          <input
            type="text"
            name="cpf"
            placeholder="Digite seu CPF (apenas números)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={11}
            onChange={handleChange}
          />
          {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Registrar
        </Button>
      </form>
    </div>
  );
}
