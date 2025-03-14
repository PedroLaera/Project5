import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import ShippingMethodRoutes from "./routes/ShippingMethodRoutes";
import ProductRoutes from "./routes/ProdutoctRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import PaymentMethodRoutes from "./routes/PaymentMethodRoutes";
import OrderRoutes from "./routes/OrderRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import AddressRoutes from "./routes/AddressRoutes";

import UserModel from "./models/UserModel";
import ProductModel from "./models/ProductModel";
import CategoryModel from "./models/CategoryModel";
import OrderModel from "./models/OrderModel";
import OrderProductModel from "./models/OrderProduct";
import ShippingMethodModel from "./models/ShippingMethodModel";
import PaymentMethodModel from "./models/PaymentMethodModel";
import PaymentModel from "./models/PaymentModel";
import AddressModel from "./models/AddressModel";
import CommentModel from "./models/CommentModel";

UserModel.hasMany(AddressModel, { foreignKey: "id_user" });
AddressModel.belongsTo(UserModel, { foreignKey: "id_user" });

//UserModel.hasMany(OrderModel, { foreignKey: 'id_user' });
//OrderModel.belongsTo(UserModel, { foreignKey: 'id_user' });

UserModel.hasMany(CommentModel, { foreignKey: "id_user" });
CommentModel.belongsTo(UserModel, { foreignKey: "id_user" });

OrderModel.hasMany(OrderProductModel, { foreignKey: "id_order" });
OrderProductModel.belongsTo(OrderModel, { foreignKey: "id_order" });

ProductModel.hasMany(OrderProductModel, { foreignKey: "id_product" });
OrderProductModel.belongsTo(ProductModel, { foreignKey: "id_product" });

CategoryModel.hasMany(ProductModel, { foreignKey: "ID_category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "ID_category" });

OrderModel.belongsTo(ShippingMethodModel, { foreignKey: "ID_shippingMethod" });
ShippingMethodModel.hasMany(OrderModel, { foreignKey: "ID_shippingMethod" });

OrderModel.belongsTo(PaymentModel, { foreignKey: "id_order" });
PaymentModel.hasMany(OrderModel, { foreignKey: "id_order" });

PaymentModel.belongsTo(PaymentMethodModel, { foreignKey: "id_paymentMethod" });
PaymentMethodModel.hasMany(PaymentModel, { foreignKey: "id_paymentMethod" });

export {
  UserModel,
  ProductModel,
  CategoryModel,
  OrderModel,
  OrderProductModel,
  ShippingMethodModel,
  PaymentMethodModel,
  PaymentModel,
  AddressModel,
  CommentModel,
};

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(express.json());
app.use(userRoutes);
app.use(CategoryRoutes);
app.use(ShippingMethodRoutes);
app.use(ProductRoutes);
app.use(PaymentRoutes);
app.use(PaymentMethodRoutes);
app.use(OrderRoutes);
app.use(CommentRoutes);
app.use(AddressRoutes);

sequelize
  .sync({
    alter: true,
  }) /* Recria as tabelas, possivelmente cria novas constraints */
  .then(() => {
    console.log("Database Foi Sincronizado Com Sucesso!!!");
  })
  .catch((error) => {
    console.log("A Base De Dados Não Foi Inicializada Com Sucesso!!!", error);
  });

app.listen(port, () => {
  console.log("Servido Rodando Na Porta", port);
});
