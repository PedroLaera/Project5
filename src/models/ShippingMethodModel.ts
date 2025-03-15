import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ShippingMethod extends Model {
  ID_shippingMethod!: string;
  name!: string;
  shippingCost!: number;
}

ShippingMethod.init(
  {
    ID_shippingMethod: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    shippingCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ShippingMethod",
    tableName: "ShippingMethod",
    timestamps: false,
  }
);

export default ShippingMethod;
