import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

// Definição da estrutura do produto
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export default function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]); // Agora tipado corretamente

  // Função para carregar os produtos da API
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProductList(response.data); // Atualiza o estado com os produtos do backend
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  // Carrega os produtos quando o componente é montado
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para excluir produto
  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      ); // Remove da lista sem recarregar a página
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
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
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Estoque
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4 text-sm text-gray-800">{product.id}</td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {product.name}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                R$ {product.price}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {product.description}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {product.stock}
              </td>
              <td className="py-2 px-4 text-sm">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
