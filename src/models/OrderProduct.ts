import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Order } from "./OrderModel";
import { Product } from "./ProductModel";

export class OrderProduct extends Model {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
}

OrderProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_pedido_produto",
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "ID_pedido",
      },
      onDelete: "CASCADE",
      field: "ID_pedido",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "ID_produto",
      },
      onDelete: "CASCADE",
      field: "ID_produto",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Quantidade",
    },
  },
  {
    sequelize,
    modelName: "OrderProduct",
    tableName: "PedidoProduto", 
    timestamps: false,
  }
);

// Definir relações
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId" });
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
});

export default OrderProduct;
