import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import OrderModel from "./OrderModel";
import PaymentMethodModel from "./PaymentMethodModel";

class Payment extends Model {}

Payment.init(
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

export default Payment;
