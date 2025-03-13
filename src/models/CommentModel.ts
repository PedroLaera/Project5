import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel"; 
import ProductModel from "./ProductModel"; 

class CommentModel extends Model {
  public ID_comment!: number;
  public comment!: string;
  public rating!: number;
  public creationDate!: Date;
  public ID_user!: number;
  public ID_product!: number;
}

CommentModel.init(
  {
    ID_comment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ID_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "Comment",
    timestamps: false,
  }
);

CommentModel.belongsTo(UserModel, { foreignKey: "ID_user", as: "user" });
CommentModel.belongsTo(ProductModel, { foreignKey: "ID_product", as: "product" });

export default CommentModel;
