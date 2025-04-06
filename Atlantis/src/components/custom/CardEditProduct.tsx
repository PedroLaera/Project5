// components/custom/CardEditProduct.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";

export default function CardEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    ID_category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          stock: response.data.stock,
          ID_category: response.data.ID_category,
        });
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Produto atualizado com sucesso:", response.data);
      navigate("/addproduct");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin">
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Editar Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <label>Nome do produto:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Descrição:</label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label>Preço:</label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <label>Estoque:</label>
          <Input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <label>ID da Categoria:</label>
          <Input
            type="number"
            name="ID_category"
            value={formData.ID_category}
            onChange={handleChange}
          />
          <Button
            onClick={updateProduct}
            className="w-full bg-white text-black"
          >
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
