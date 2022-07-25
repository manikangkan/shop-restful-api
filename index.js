const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  res.send("Welcome there🫠");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}🤫`);
});
