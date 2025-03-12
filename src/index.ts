import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import ShippingMethodRoutes from "./routes/ShippingMethodRoutes";
import ProductRoutes from "./routes/ProdutoctRoutes";
import PaymentRoutes from "./routes/PaymentRoutes"
import PaymentMethodRoutes from "./routes/PaymentMethodRoutes"
import OrderRoutes from "./routes/OrderRoutes"
import CommentRoutes from "./routes/CommentRoutes"
import CategoryRoutes from "./routes/CategoryRoutes";
import AddressRoutes from "./routes/AddressRoutes"


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
  .sync({ alter: true })
  .then(() => {
    console.log("Database Foi Sincronizado Com Sucesso!!!");
  })
  .catch((error) => {
    console.log("A Base De Dados Não Foi Inicializada Com Sucesso!!!", error);
  });

app.listen(port, () => {
  console.log("Servido Rodando Na Porta", port);
});
