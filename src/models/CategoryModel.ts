import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_categoria",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Nome",
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categoria", 
    timestamps: false,
  }
);

export default Category;
