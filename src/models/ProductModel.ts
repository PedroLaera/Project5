import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Category } from "./CategoryModel";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public categoryId!: number;
  public stock!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_produto",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Nome",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "Descricao",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "Preco",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "ID_categoria",
      },
      onDelete: "CASCADE",
      field: "ID_categoria",
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Estoque",
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Produto", 
    timestamps: false,
  }
);

// Definir relacionamento
Product.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Product, { foreignKey: "categoryId" });

export default Product;
