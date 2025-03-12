import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Order from "./OrderModel";
import PaymentMethod from "./PaymentMethodModel";

export class Payment extends Model {
  public ID_payment!: number;
  public ID_order!: number;
  public ID_payment_method!: number;
  public AmountPaid!: number;
  public PaymentDate!: Date;
}

Payment.init(
  {
    ID_payment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "ID_order",
      },
      onDelete: "CASCADE",
    },
    ID_payment_method: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PaymentMethod,
        key: "ID_payment_method",
      },
      onDelete: "CASCADE",
    },
    AmountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    PaymentDate: {
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


Order.hasOne(Payment, { foreignKey: "ID_order" });
Payment.belongsTo(Order, { foreignKey: "ID_order" });

PaymentMethod.hasMany(Payment, { foreignKey: "ID_payment_method" });
Payment.belongsTo(PaymentMethod, { foreignKey: "ID_payment_method" });

export default Payment;
