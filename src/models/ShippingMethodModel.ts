import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class ShippingMethod extends Model {
  public id!: number;
  public name!: string;
  public shippingCost!: number;
}

ShippingMethod.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_metodo_envio", // Mapeia para o nome da coluna no banco
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Nome_metodo",
    },
    shippingCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Valor_frete",
    },
  },
  {
    sequelize,
    modelName: "ShippingMethod",
    tableName: "MetodoEnvio", // Nome original da tabela no banco
    timestamps: false,
  }
);

export default ShippingMethod;
