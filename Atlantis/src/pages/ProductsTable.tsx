import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

// Definição da estrutura do produto e da categoria
interface Product {
  id_product: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  ID_category?: number; // <- importante adicionar
}

interface Category {
  id_category: number;
  name: string;
}

export default function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  // Carrega os produtos
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProductList(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  // Carrega as categorias
  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategoryList(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Função para excluir produto
  const deleteProduct = async (id: number, name: string) => {
    try {
      const confirmDelete = window.confirm(
        `Tem certeza que deseja excluir o produto ${name}?`
      );
      if (!confirmDelete) return;

      await api.delete(`/products/${id}`);
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product.id_product !== id)
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

  // Pega o nome da categoria dado o ID
  const getCategoryName = (categoryId?: number) => {
    const category = categoryList.find((cat) => cat.id_category === categoryId);
    return category ? category.name : "Sem categoria";
  };

  return (
    <div className="w-full text-white! min-h-screen p-6 bg-zinc-900">
      {/* Container para o título e os botões */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-300">
          Produtos Cadastrados
        </h1>
        <div className="flex gap-4">
          <Link
            to="/createProduct"
            className="px-5 py-2 border border-white bg-zinc-900 text-white! rounded-lg hover:bg-zinc-800 transition"
          >
            Adicionar Novo Produto
          </Link>
          <Link
            to="/createCategory"
            className="px-5 py-2 border border-white bg-zinc-900 text-white! rounded-lg hover:bg-zinc-800 transition"
          >
            Adicionar Categoria
          </Link>
        </div>
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
              Categoria
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
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
              <td className="py-2 px-4 text-sm text-gray-800">
                {getCategoryName(product.ID_category)}
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
