const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "product get",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "product post",
  });
});

router.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  productId === "special"
    ? res.status(200).json({ message: "success", productId: productId })
    : res.status(404).json({ message: "fail", productId: productId });
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({ message: "updated product" });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({ message: "deleted product" });
});

module.exports = router;
