import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel"; // Relacionamento com Order
import AddressModel from "./AddressModel"; // Relacionamento com Address
import CommentModel from "./CommentModel"; // Relacionamento com Comment

class UserModel extends Model {
  public ID_user!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public cartCreationDate!: Date;
}

UserModel.init(
  {
    ID_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 255], // Exemplo: senha mínima de 6 caracteres
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 255],
      },
    },
    cartCreationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
    timestamps: false,
  }
);


UserModel.hasMany(OrderModel, { foreignKey: "ID_user", as: "orders" });
UserModel.hasMany(AddressModel, { foreignKey: "ID_user", as: "addresses" });
UserModel.hasMany(CommentModel, { foreignKey: "ID_user", as: "comments" });

export default UserModel;
