import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel";
import PaymentMethodModel from "./PaymentMethodModel";

class PaymentModel extends Model {
  public ID_payment!: number;
  public ID_order!: number;
  public ID_paymentMethod!: number;
  public amountPaid!: number;
  public paymentDate!: Date;
}

PaymentModel.init(
  {
    ID_payment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ID_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_paymentMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amountPaid: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "Payment",
    timestamps: false,
  }
);

PaymentModel.belongsTo(OrderModel, { foreignKey: "ID_order", as: "order" });
PaymentModel.belongsTo(PaymentMethodModel, { foreignKey: "ID_paymentMethod", as: "paymentMethod" });

export default PaymentModel;
