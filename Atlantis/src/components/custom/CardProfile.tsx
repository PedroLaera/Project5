import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  CPF: string;
}

export default function ProfileCard() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    CPF: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const id_user = localStorage.getItem("id_user");
      const token = localStorage.getItem("token");

      try {
        const response = await api.get(`/users/${id_user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    navigate("/login");
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Carregando...</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin mt-10">
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Meu Perfil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg text-zinc-700">
        <p>
          <strong>Nome:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>CPF:</strong> {userData.CPF}
        </p>
        <div className="text-center mt-6">
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Sair
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
