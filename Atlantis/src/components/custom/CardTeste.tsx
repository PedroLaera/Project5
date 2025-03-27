import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";

export default function RegisterCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "cpf") {
      // Remove tudo que não for número
      value = value.replace(/\D/g, "");

      // Aplica a máscara XXX.XXX.XXX-XX
      if (value.length <= 11) {
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const CreateUser = async () => {
    try {
      const formattedCPF = formData.cpf.replace(/\D/g, ""); // Remove tudo que não for número

      if (formattedCPF.length !== 11) {
        alert("CPF inválido! Certifique-se de digitar um CPF válido.");
        return;
      }

      const finalCPF = formattedCPF.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
      ); // Formata para XXX.XXX.XXX-XX

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
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Cadastro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
          <Button
            onClick={CreateUser}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Enviar
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
