import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface Address {
  ID_address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  id_user: string; // Adicionado para permitir filtragem
}

export default function CardAndress() {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      const id_user = localStorage.getItem("id_user");
      const token = localStorage.getItem("token");

      if (!id_user || !token) {
        console.error("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userAddress = response.data.find(
          (addr: Address) => addr.id_user === id_user
        );

        setAddress(userAddress || null);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Carregando endereço...</p>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin mt-10">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-600 text-center">
          Endereço
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-lg text-zinc-700">
        {address ? (
          <>
            <p>
              <strong>Rua:</strong> {address.ID_address}
            </p>
            <p>
              <strong>Número:</strong> {address.number}
            </p>
            <p>
              <strong>Complemento:</strong> {address.complement}
            </p>
            <p>
              <strong>Bairro:</strong> {address.neighborhood}
            </p>
            <p>
              <strong>Cidade:</strong> {address.city}
            </p>
            <p>
              <strong>Estado:</strong> {address.state}
            </p>
            <p>
              <strong>CEP:</strong> {address.zipCode}
            </p>
          </>
        ) : (
          <div className="text-center">
            <p className="mb-4">Você ainda não cadastrou um endereço.</p>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate("/AddAndress")}
            >
              Cadastrar Endereço
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
