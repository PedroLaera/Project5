import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";

export default function RegisterCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    CPF: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const CreateUser = async () => {
    try {
      const formattedCPF = formData.CPF.replace(/\D/g, ""); // Remove tudo que não for número

      if (formattedCPF.length !== 11) {
        alert("CPF inválido! Certifique-se de digitar um CPF válido.");
        return;
      }

      const finalCPF = formattedCPF.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
      ); // Formata para XXX.XXX.XXX-XX

      console.log(formData.CPF);
      const response = await api.post("/users", {
        ...formData,
        cpf: finalCPF, // Envia já formatado
      });

      console.log("Usuário criado com sucesso!", response.data);
    } catch (error) {
      const errorMessage =
        (error instanceof Error &&
          (error as { response?: { data?: { error?: string } } })?.response
            ?.data?.error) ||
        "Erro ao cadastrar";
      alert(errorMessage);
      console.error("Erro ao tentar criar usuário:", errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin">
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Registre-se
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <label>Digite seu nome:</label>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Digite seu e-mail:</label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Digite sua senha:</label>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Digite seu CPF:</label>
          <Input
            type="text"
            name="CPF"
            placeholder="CPF"
            value={formData.CPF}
            onChange={handleChange}
            required
          />
          <Button
            onClick={CreateUser}
            className="w-full bg-white! text-zinc-900! hover: bg-gray-200!"
          >
            <Link to="/login" className="text-blue-600">
              Cadastrar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/*
  const CreateUser = async () => {
    try {
      await api.post("/user", {
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        password: formData.password,
      });
    } catch (error) {
      console.error("Erro ao tentar fazer a requisição:", error);
    }
  }; */
