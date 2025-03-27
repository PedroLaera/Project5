import React, { useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "Usuário Exemplo",
    email: "usuario@email.com",
    password: "123456",
    address: "Rua Exemplo, 123 - Cidade",
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Função para alterar os valores do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Função para salvar os dados
  const handleSave = () => {
    setIsEditing(false);
    alert("Dados salvos com sucesso!"); // Simulação de salvamento
  };

  // Função para adicionar uma foto de perfil
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg relative">
        <h1 className="text-3xl font-bold text-center text-black-600 mb-6">
          Perfil do Usuário
        </h1>

        {/* Foto de Perfil */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32">
            <img
              src={userData.profileImage || "https://via.placeholder.com/150"}
              alt="Foto de Perfil"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            {isEditing && (
              <>
                {/* Rótulo visível para acessibilidade */}
                <label
                  htmlFor="profileImage"
                  className="mt-2 text-blue-600 cursor-pointer"
                >
                  Alterar Foto
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
        </div>

        {/* Formulário de Informações */}
        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-gray-600">
              Nome
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Digite seu nome"
              title="Digite seu nome completo"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              disabled={!isEditing}
              placeholder="Digite seu E-mail"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              disabled={!isEditing}
              placeholder="Digite sua senha"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              disabled={!isEditing}
              placeholder="Digite seu endereço"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botão Editar/Salvar no Canto Inferior Direito */}
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`absolute bottom-6 right-6 px-6 py-3 text-white font-bold rounded-lg transition ${
            isEditing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isEditing ? "Salvar" : "Editar"}
        </button>
      </div>
    </div>
  );
}
