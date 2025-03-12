import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class PaymentMethod extends Model {
  public ID_payment_method!: number;
  public Name!: string;
}

PaymentMethod.init(
  {
    ID_payment_method: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
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
