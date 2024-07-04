const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const User = require("./models/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const cart = require("./models/cart");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected"))
  .catch((e) => console.log(e));

// This is the routers middleware
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.listen(process.env.PORT, () => {
  console.log("Server is working");
});
