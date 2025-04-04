import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Button } from "../components/ui/button";
export default function EditProductCard() {
  const { id } = useParams(); // ID do produto vindo da URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  // Buscar o produto pelo ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const { name, price, description, stock } = response.data;
        setForm({
          name,
          price: String(price),
          description,
          stock: String(stock),
        });
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Atualizar estado dos inputs
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(form.price);
    const stock = parseInt(form.stock);

    if (isNaN(price) || isNaN(stock)) {
      alert("Preço e Estoque devem ser números válidos.");
      return;
    }

    try {
      const payload = {
        name: form.name,
        price,
        description: form.description,
        stock,
      };

      console.log("Enviando dados para atualização:", payload);

      await api.put(`/products/${id}`, payload);

      alert("Produto atualizado com sucesso!");
      navigate("/products");
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);
      alert(
        error?.response?.data?.error ||
          "Erro ao atualizar produto. Verifique os dados enviados."
      );
    }
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Editar Produto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Digite o nome do produto"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Preço</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Digite o preço do produto"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Digite a descrição do produto"
              required
            />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
}
