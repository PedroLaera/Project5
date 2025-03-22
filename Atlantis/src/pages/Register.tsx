import { Button } from "../components/ui/button";

export default function Register() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Criar Conta
        </h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600">Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Registrar
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
