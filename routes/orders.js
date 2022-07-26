const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        order: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: `http://localhost:4000/orders/${doc._id}`,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  // const order = {
  //   productId: req.body.productId,
  //   quantity: req.body.quantity,
  // };
  Product.findById(req.body.productId)
    .then((product) => {
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });

      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "order post",
        createdOrder: {
          _id: result._id,
          product: result.productId,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: `http://localhost:400/orders/${result._id}`,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product")
    .then((result) => {
      if (!result)
        res.status(404).json({
          message: "Order not found",
        });
      console.log(result);
      res.status(200).json({
        message: "single order get",
        orderDetails: result,
        request: {
          type: "GET",
          url: "http://localhost:4000/orders",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Product not found",
        error: err,
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({ id: req.params.orderId })
    .then((result) => {
      if (!result)
        res.status(404).json({
          message: "Order not found",
        });
      res.status(200).json({
        message: "order deleted",
        deleteOrder: result,
        request: {
          type: "POST",
          url: "http://localhost:4000/orders",
          body: {
            productId: "ID",
            quantity: "Number",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Order not found for remove",
        error: err,
      });
    });
});

module.exports = router;
