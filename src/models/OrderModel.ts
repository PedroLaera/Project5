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

// Definição da tabela
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_pedido", // nome original no banco
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id", // Nome do campo na tabela User
      },
      onDelete: "CASCADE",
      field: "ID_usuario", // nome original no banco
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "Data_pedido", // nome original no banco
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Total_pedido", // nome original no banco
    },
    shippingFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Frete", // nome original no banco
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "Status", // nome original no banco
    },
    shippingMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShippingMethod,
        key: "id", // Nome do campo na tabela ShippingMethod
      },
      onDelete: "CASCADE",
      field: "ID_metodo_envio", // nome original no banco
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "Desconto", // nome original no banco
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Pedido", // Nome original da tabela no banco
    timestamps: false,
  }
);

// Definir relações
Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

Order.belongsTo(ShippingMethod, { foreignKey: "shippingMethodId" });
ShippingMethod.hasMany(Order, { foreignKey: "shippingMethodId" });

export default Order;
