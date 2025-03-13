import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { OrderModel, PaymentMethodModel } from "..";

class PaymentMethod extends Model {}

PaymentMethod.init(
  {
    id_paymentMethod: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
     /* references: {
        model: PaymentMethodModel,
        key: 'id_paymentMethod'
      },*/
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PaymentMethod",
    tableName: "PaymentMethod",
    timestamps: false,
  }
);

export default PaymentMethod;
