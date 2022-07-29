const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .then((products) => {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            _id: product._id,
            name: product.name,
            price: product.price,
            productImage: product.productImage,
            request: {
              type: "GET",
              url: `http://localhost:4000/products/${product._id}`,
            },
          };
        }),
      };
      products.length > 0
        ? res.status(200).json({
            message: "Products fetched successfully",
            response,
          })
        : res.status(404).json({
            message: "No products found",
          });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching products failed",
        error: err,
      });
    });
};

exports.products_create_product = (req, res, next) => {
  // const product = {
  //   name: req.body.name,
  //   price: req.body.price,
  // };
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "product post",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: `http://localhost:4000/products/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .then((doc) => {
      console.log(doc);
      doc
        ? res.status(200).json({
            message: "Product fetched successfully",
            product: doc,
            request: {
              type: "GET",
              description: "Get all products",
              url: `http://localhost:4000/products`,
            },
          })
        : res.status(404).json({ message: "Product not found" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update(
    { _id: id },
    {
      $set: updateOps,
    }
  )
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: `http://localhost:4000/products/${id}`,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: `http://localhost:4000/products`,
          body: {
            name: "String",
            price: "Number",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
