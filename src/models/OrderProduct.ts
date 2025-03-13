import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel";
import ProductModel from "./ProductModel";

class OrderProductModel extends Model {
  public ID_orderProduct!: number;
  public ID_order!: number;
  public ID_product!: number;
  public quantity!: number;
}

OrderProductModel.init(
  {
    ID_orderProduct: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ID_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

OrderProductModel.belongsTo(OrderModel, { foreignKey: "ID_order", as: "order" });
OrderProductModel.belongsTo(ProductModel, { foreignKey: "ID_product", as: "product" });

export default OrderProductModel;
