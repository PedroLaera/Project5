import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import Category from "./models/CategoryModel";
import CategoryRoutes from "./routes/CategoryRoutes";
//import collectionRoutes from "./routes/collectionRoutes";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(express.json());
app.use(userRoutes);
app.use(CategoryRoutes);
//app.use(collectionRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("deu zica no bagulho", error);
  });

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
