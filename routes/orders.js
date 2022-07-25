const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "order get",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "order post",
  });
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "single order get",
    orderId: orderId,
  });
});
router.delete("/:id", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "order deleted",
    orderId: orderId,
  });
});

module.exports = router;
