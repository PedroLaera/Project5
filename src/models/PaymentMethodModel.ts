import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class PaymentMethod extends Model {}

PaymentMethod.init(
  {
    ID_paymentMethod: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
