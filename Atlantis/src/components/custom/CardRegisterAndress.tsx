import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "sonner";

export default function AddAddressCard() {
  const [formData, setFormData] = useState({
    ID_address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id_user = localStorage.getItem("id_user");
    const token = localStorage.getItem("token");

    if (!id_user || !token) {
      toast.error("Usuário não autenticado.");
      return;
    }

    try {
      await api.post(
        "/address",
        {
          ...formData,
          id_user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Endereço cadastrado com sucesso!");
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao cadastrar endereço:", error);
      toast.error("Erro ao cadastrar endereço.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-light text-blue-600 text-center">
          Cadastrar Endereço
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Identificador do Endereço (ex: Casa, Trabalho)"
            name="ID_address"
            value={formData.ID_address}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Número"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
          <Input
            placeholder="Complemento"
            name="complement"
            value={formData.complement}
            onChange={handleChange}
          />
          <Input
            placeholder="Bairro"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
          />
          <Input
            placeholder="Cidade"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            placeholder="Estado"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <Input
            placeholder="CEP"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />

          <div className="text-center mt-4">
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Salvar Endereço
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
