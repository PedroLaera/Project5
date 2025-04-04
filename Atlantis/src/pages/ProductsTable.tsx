import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

// Definição da estrutura do produto
interface Product {
  id_product: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export default function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);

  // Função para carregar os produtos da API
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProductList(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  // Carrega os produtos quando o componente é montado
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para excluir produtos
  const deleteProduct = async (id: number, name: string) => {
    try {
      const confirmDelete = window.confirm(
        `Tem certeza que deseja excluir o produto ${name}?`
      );
      if (!confirmDelete) return;

      const response = await api.delete(`/products/${id}`);

      console.log("Produto excluído com sucesso!", response.data);

      setProductList(
        (prevProducts) =>
          prevProducts.filter((product) => product.id_product !== id) // Alterado de product.id para product.id_product
      );
    } catch (error) {
      const errorMessage =
        (error instanceof Error &&
          (error as { response?: { data?: { error?: string } } })?.response
            ?.data?.error) ||
        "Erro ao tentar excluir o produto";
      alert(errorMessage);
      console.error("Erro ao tentar excluir produto:", errorMessage);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-zinc-900">
      {/* Container para o título e o botão */}
      <div className="flex justify-between items-center mb-4">
        {/* Título no canto superior esquerdo */}
        <h1 className="text-lg font-semibold text-gray-300">
          Produtos Cadastrados
        </h1>

        {/* Botão para adicionar um novo produto */}
        <Link
          to="/createProduct"
          className="px-5 py-2 border-1 border-white bg-zinc-900 text-white! rounded-lg hover:bg-zinc-900 transition"
        >
          Adicionar Novo Produto
        </Link>
      </div>

      {/* Tabela de produtos */}
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              ID
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Nome
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Preço
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Descrição
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600 ml-10!">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id_product} className="border-b">
              <td className="py-2 px-4 text-sm text-gray-800">
                {product.id_product}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {product.name}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                R$ {product.price}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {product.description}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800 flex gap-2">
                <button
                  onClick={() =>
                    deleteProduct(product.id_product, product.name)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Excluir
                </button>
                <Link
                  to={`/editProduct/${product.id_product}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
