import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public cartCreationDate!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_usuario",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Nome",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: "Email",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "Senha",
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "Endereco",
    },
    cartCreationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "Data_criacao_carrinho",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "usuario", // Nome original da tabela no banco
    timestamps: false,
  }
);

export default User;
