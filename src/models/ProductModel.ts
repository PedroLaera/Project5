import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import CategoryModel from "./CategoryModel"; 
//import SubCategoryModel from "./SubCategoryModel"; 

class ProductModel extends Model {
  public ID_product!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public ID_category!: number;
  public stock!: number;
}

ProductModel.init(
  {
    ID_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ID_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Product",
    timestamps: false,
  }
);

ProductModel.belongsTo(CategoryModel, { foreignKey: "ID_category", as: "category" });
//ProductModel.belongsTo(SubCategoryModel, { foreignKey: "ID_category", as: "subcategory" });

export default ProductModel;
