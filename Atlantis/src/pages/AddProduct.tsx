import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../components/data/products"; // Importa os produtos

export default function ProductList() {
  const [productList, setProductList] = useState(products);

  // Função para excluir produto
  const deleteProduct = (id: string) => {
    setProductList(productList.filter((product) => product.id !== id)); // Filtra o produto que foi excluído
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-900">
      {/* Container para o título e o botão */}
      <div className="flex justify-between items-center mb-4">
        {/* Título no canto superior esquerdo */}
        <h1 className="text-lg font-semibold text-gray-300">
          Produtos Cadastrados
        </h1>

        {/* Botão para adicionar um novo produto no canto superior direito */}
        <Link
          to="/createProduct"
          className="px-5 py-2 bg-blue-800 text-white-500 rounded-lg hover:bg-blue-700"
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
                {product.price}
              </td>
              <td className="py-2 px-4 text-sm">
                {/* Botão de exclusão */}
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
