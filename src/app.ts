import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import ProductRoutes from "./routes/ProdutoctRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import AddressRoutes from "./routes/AddressRoutes";
import LoginRoutes from "./routes/LoginRoutes";
//import PaymentMethodRoutes from "./routes/PaymentMethodRoutes";
//import OrderRoutes from "./routes/OrderRoutes";
//import PaymentRoutes from "./routes/PaymentRoutes";
//import ShippingMethodRoutes from "./routes/ShippingMethodRoutes";
//import checkoutRoutes from "./routes/checkoutRoutes"

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(express.json());
app.use(userRoutes);
app.use(CategoryRoutes);
app.use(ProductRoutes);
app.use(CommentRoutes);
app.use(AddressRoutes);
app.use(LoginRoutes);
//app.use(PaymentMethodRoutes);
//app.use(PaymentRoutes);
//app.use(ShippingMethodRoutes);
//app.use(OrderRoutes);

export default app