import React, { useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Dados salvos com sucesso!"); // Aqui você pode adicionar a lógica para salvar no banco de dados
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Perfil do Usuário
        </h1>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-gray-600">Nome</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              title="Nome"
              placeholder="Digite seu nome"
              disabled={!isEditing}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-gray-600">E-mail</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              title="E-mail"
              placeholder="Digite seu e-mail"
              disabled={!isEditing}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-gray-600">Senha</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              title="Senha"
              placeholder="Digite sua senha"
              disabled={!isEditing}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-gray-600">Endereço</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              title="Endereço"
              placeholder="Digite seu endereço"
              disabled={!isEditing}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Editar Perfil
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Salvar Alterações
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
