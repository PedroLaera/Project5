import { Sequelize } from "sequelize";

const sequelize = new Sequelize("perfumes_homolog", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
