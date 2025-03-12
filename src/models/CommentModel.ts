import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./UserModel";
import Product from "./ProductModel";

export class Comment extends Model {
  public ID_comment!: number;
  public ID_user!: number;
  public ID_product!: number;
  public Content!: string;
  public Rating!: number;
  public CreatedAt!: Date;
}

Comment.init(
  {
    ID_comment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "ID_user",
      },
      onDelete: "CASCADE",
    },
    ID_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "ID_product",
      },
      onDelete: "CASCADE",
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "Comment",
    timestamps: false,
  }
);

User.hasMany(Comment, { foreignKey: "ID_user" });
Comment.belongsTo(User, { foreignKey: "ID_user" });

Product.hasMany(Comment, { foreignKey: "ID_product" });
Comment.belongsTo(Product, { foreignKey: "ID_product" });

export default Comment;
