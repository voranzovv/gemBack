// src/todoRouter.js
const express = require("express");
const Product = require("../models/products");
const productRouter = express.Router();
const multer = require("multer");
// const checkAuth = require("../api/middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 10,
  // },
  fileFilter: fileFilter,
});

// List all products
productRouter.get("/", async (_, res) => {
  res.json(await Product.find({}));
});

// Read product by ID
productRouter.get("/:pId", async (req, res) => {
  const { pId } = req.params;
  res.json(await Product.findById({ _id: pId }));
});

// Delete product by ID
productRouter.delete("/:pId", async (req, res) => {
  const { pId } = req.params;
  await Product.deleteOne({ _id: pId });
  res.status(204).send();
});

// Update product by ID
productRouter.put(
  "/:pId",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    const { name, category, description } = req.body;
    const { pId } = req.params;
    res.json(
      await Product.updateOne(
        { _id: pId },
        {
          name,
          category,
          description,
          image: req.files.image[0].filename,
        }
      )
    );
  }
);

// Create a product
productRouter.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    console.log(req.files);
    const { name, category, description } = req.body;
    res.json(
      await Product.create({
        name,
        category,
        description,
        image: req.files.image[0].filename,
      })
    );
  }
);

module.exports = productRouter;
