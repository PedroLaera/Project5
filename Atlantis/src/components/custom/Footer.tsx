import { Separator } from "../ui/separator"; // Importando o Separator
import { Button } from "../ui/button"; // Importando o Button do seu projeto

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 w-full">
      <div className="container mx-auto flex items-center justify-between w-full px-4">
        {/* Parte esquerda: Ícones das redes sociais */}
        <div className="flex items-center space-x-6">
          <a
            href="https://wa.me/123456789"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Ícone do WhatsApp */}
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Ícone do Instagram */}
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Ícone do Facebook */}
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Ícone do GitHub */}
          </a>
        </div>

        {/* Linha separadora */}
        <Separator orientation="vertical" className="h-16 mx-6" />

        {/* Parte central: Logo */}
        <div className="flex justify-center items-center">
          <img src="/assets/logo.png" alt="Logo" className="h-16" />
        </div>

        {/* Parte direita: Links de navegação */}
        <div className="space-y-4">
          <Button variant="link" className="text-white hover:text-gray-300">
            Home
          </Button>
          <Button variant="link" className="text-white hover:text-gray-300">
            Login
          </Button>
          <Button variant="link" className="text-white hover:text-gray-300">
            Suporte
          </Button>
        </div>
      </div>

      {/* Espaço adicional para o footer ocupar toda a largura */}
      <div className="w-full bg-gray-700 py-4">
        {/* Pode adicionar algum texto de copyright ou qualquer outro conteúdo adicional */}
        <p className="text-center text-sm text-gray-300">
          © 2025 Sua Empresa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
