import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { User } from "./UserModel";
import { ShippingMethod } from "./ShippingMethodModel";

export class Order extends Model {
  public id!: number;
  public userId!: number;
  public orderDate!: Date;
  public totalAmount!: number;
  public shippingFee!: number;
  public status!: string;
  public shippingMethodId!: number;
  public discount?: number;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_pedido", 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id", 
      },
      onDelete: "CASCADE",
      field: "ID_usuario", 
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "Data_pedido",
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Total_pedido", 
    },
    shippingFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Frete", 
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "Status", 
    },
    shippingMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShippingMethod,
        key: "id", 
      },
      onDelete: "CASCADE",
      field: "ID_metodo_envio",
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "Desconto", 
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Pedido", 
    timestamps: false,
  }
);


Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

Order.belongsTo(ShippingMethod, { foreignKey: "shippingMethodId" });
ShippingMethod.hasMany(Order, { foreignKey: "shippingMethodId" });

export default Order;
