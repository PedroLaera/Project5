import {  DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./UserModel";

export class Address extends Model {
    public ID_address!: number;
    public Number!: string;
    public Complement?: string;
    public Neighborhood!: string;
    public City!: string;
    public State!: string;
    public ZIP!: string;
    public ID_user!: number;
  }

  Address.init(
    {
      ID_address: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Complement: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      City: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      State: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ZIP: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "Address",
      timestamps: false,
    }
  );
  
  User.hasMany(Address, { foreignKey: "ID_user" });
  Address.belongsTo(User, { foreignKey: "ID_user" });
  
  export default Address;