import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel"; 
import OrderModel from "./OrderModel"; 

class AddressModel extends Model {
  public ID_address!: number;
  public number!: string;
  public complement!: string;
  public neighborhood!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public ID_user!: number;
  public ID_order!: number;
}

AddressModel.init(
  {
    ID_address: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ID_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "Address",
    timestamps: false,
  }
);

AddressModel.belongsTo(UserModel, { foreignKey: "ID_user", as: "user" });
AddressModel.belongsTo(OrderModel, { foreignKey: "ID_order", as: "order" });

export default AddressModel;
