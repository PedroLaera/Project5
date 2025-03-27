import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

interface ProductsProps {
  name: string;
  description: string;
  price: string;
  stock: string;
  ID_category: number;
}
export default function NewPerfumeCard() {
  const [product, setProduct] = useState<ProductsProps[]>([]);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const response = await api.get("/product");
    setProduct(response.data);
  }
  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>Novo Perfume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>Imagem do Perfume</Label>
        <Input type="file" accept="image/*" />

        <Label>Nome do Perfume</Label>
        <Input placeholder="Digite o nome" />

        <Label>Marca</Label>
        <Input placeholder="Digite a marca" />

        <Label>Descrição</Label>
        <Textarea placeholder="Digite a descrição" />

        <Label>Valor</Label>
        <Input type="number" placeholder="Digite o valor" />

        <Label>Família Olfativa</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a família olfativa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="amadeirado">Amadeirado</SelectItem>
            <SelectItem value="citrico">Cítrico</SelectItem>
            <SelectItem value="floral">Floral</SelectItem>
            <SelectItem value="oriental">Oriental</SelectItem>
            <SelectItem value="fougère">Fougère</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full">Criar Perfume</Button>
      </CardContent>

      {product.map((product) => (
        <Card key={product.ID_category}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Descrição:</strong> {product.description}
            </p>
            <p>
              <strong>Preço:</strong> R$ {product.price}
            </p>
            <p>
              <strong>Estoque:</strong> {product.stock}
            </p>
            <p>
              <strong>Família Olfativa:</strong> {product.ID_category}
            </p>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
}

/*
const navigate = useNavigate();

  // Estado para os campos do formulário
  const [productData, setProductData] = useState({
    name: "",
    manufacturer: "",
    createdDate: "",
    category: "",
    price: "",
    description: "",
    image: null as File | null,
  });

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Função para lidar com a seleção da imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductData((prevData) => ({
        ...prevData,
        image: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  // Função para salvar o produto
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Adiciona o produto ao array global
    addProduct(productData);

    // Redireciona para a lista de produtos
    navigate("/addproduct");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-600">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Criar Novo Produto
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Nome do produto 
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="name"
            >
              Nome do Produto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Empresa que industrializa *
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="manufacturer"
            >
              Empresa
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={productData.manufacturer}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Data de criação *
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="createdDate"
            >
              Data de Criação
            </label>
            <input
              type="date"
              id="createdDate"
              name="createdDate"
              value={productData.createdDate}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Categoria *
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="category"
            >
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecione uma Categoria</option>
              <option value="claro">Claro</option>
              <option value="escuro">Escuro</option>
              <option value="médio">Médio</option>
              {/* Adicione outras categorias conforme necessário *
            </select>
          </div>

          {/* Preço *
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="price"
            >
              Preço
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Descrição *
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="description"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Imagem *
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="image"
            >
              Imagem (JPG ou PNG)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg,.png"
              onChange={handleImageChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Botão Criar Produto *
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Criar Produto
          </button>
        </form>
      </div>
    </div>
  );
*/
