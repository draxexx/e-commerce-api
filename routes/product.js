// import express library
const express = require("express");
// get Router function
const router = express.Router();

// get Product model
const Product = require("../models/product.js");
// import verifyTokenAndAuthorization, verifyTokenAndAdmin middlewares
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// get all products
router.get("/", async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      // gets last 5 inserted rows
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      // gets typed category
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      // gets all products
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get product by id
router.get("/find/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new product
router.post("/", verifyTokenAndAdmin, async (req, res, next) => {
  // create Product object
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update product
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// delete the product by id
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
