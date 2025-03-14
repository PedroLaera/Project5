import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel";
import ProductModel from "./ProductModel";
import { ShippingMethodModel, UserModel } from "..";

class OrderProduct extends Model {}

OrderProduct.init(
  {
    id_order_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /* references: {
        model: OrderModel,
        key: 'id_order'
      }*/
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /* references: {
        model: ProductModel,
        key: 'id_product'
      }*/
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderProduct",
    tableName: "OrderProduct",
    timestamps: false,
  }
);

export default OrderProduct;
