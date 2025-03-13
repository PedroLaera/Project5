import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel"; // Relacionamento com Order
import AddressModel from "./AddressModel"; // Relacionamento com Address
import CommentModel from "./CommentModel"; // Relacionamento com Comment

class User extends Model {}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cart_creation_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: false
  }
);

export default User;
