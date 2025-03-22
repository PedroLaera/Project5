import { Button } from "../components/ui/button";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              title="Email"
              placeholder="Digite seu email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Senha</label>
            <input
              type="password"
              title="Senha"
              placeholder="Digite sua senha"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Entrar
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Ainda não tem uma conta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
