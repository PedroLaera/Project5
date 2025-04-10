import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { maskJs } from "mask-js";

export default function CardTeste() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    CPF: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    CPF: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "CPF") {
      const cleanedValue = value.replace(/\D/g, "");
      const formattedValue = maskJs("999.999.999-99", cleanedValue);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: false });
  };

  const validateFields = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: !/\S+@\S+\.\S+/.test(formData.email),
      password: formData.password.trim() === "",
      CPF: formData.CPF.replace(/\D/g, "").length !== 11,
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((err) => err);
  };

  const CreateUser = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const formattedCPF = formData.CPF.replace(/\D/g, "");

      const finalCPF = formattedCPF.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
      );

      const response = await api.post("/users", {
        ...formData,
        CPF: finalCPF,
      });

      console.log("Usuário criado com sucesso!", response.data);
      navigate("/login");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "Erro ao cadastrar";
      alert(errorMessage);
      console.error("Erro ao tentar criar usuário:", errorMessage);
    }
  };

  return (
    <Card className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Registre-se
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <label className="text-gray-800">Digite seu nome:</label>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
            required
          />
          <label className="text-gray-800">Digite seu e-mail:</label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
            required
          />
          <label className="text-gray-800">Digite sua senha:</label>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500" : ""}
            required
          />
          <label className="text-gray-800">Digite seu CPF:</label>
          <Input
            type="text"
            name="CPF"
            placeholder="CPF"
            value={formData.CPF}
            onChange={handleChange}
            className={errors.CPF ? "border-red-500" : ""}
            required
          />
          <Button
            onClick={CreateUser}
            className="w-full bg-black! text-white hover:bg-blue-600!"
          >
            Cadastrar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
