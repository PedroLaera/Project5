import Card from "../components/custom/Card";
export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800">Bem-vindo à Home</h1>
      <p className="text-gray-600 mt-2">Explore nossos produtos incríveis!</p>
      <Card />
    </div>
  );
}

/*
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-60 h-80 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-xl text-green-600 mt-2">{product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
*/
