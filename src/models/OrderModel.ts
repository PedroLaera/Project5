import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel"; 
import ProductModel from "./ProductModel"; 
import ShippingMethodModel from "./ShippingMethodModel"; 

class OrderModel extends Model {
  public ID_order!: number;
  public ID_user!: number;
  public orderDate!: Date;
  public totalOrder!: number;
  public shipping!: number;
  public status!: string;
  public ID_shippingMethod!: number;
  public discount!: number;
  public quantity!: number;
  public ID_product!: number;
}

OrderModel.init(
  {
    ID_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ID_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    totalOrder: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    shipping: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ID_shippingMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ID_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Order",
    timestamps: false,
  }
);

// 📌 Definição de relacionamentos
OrderModel.belongsTo(UserModel, { foreignKey: "ID_user", as: "user" });
OrderModel.belongsTo(ShippingMethodModel, { foreignKey: "ID_shippingMethod", as: "shippingMethod" });
OrderModel.belongsTo(ProductModel, { foreignKey: "ID_product", as: "product" });

export default OrderModel;
