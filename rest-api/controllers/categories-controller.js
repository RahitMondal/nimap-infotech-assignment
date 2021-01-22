const { validationResult } = require("express-validator");

const Category = require("../models/Category");
const Product = require("../models/Product");
const HttpError = require("../models/HttpError");

const saveCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(422, "Input validation failed");
    return next(error);
  }

  const category = new Category({
    name: req.body.name,
  });

  try {
    await category.save();
  } catch (err) {
    const error = new HttpError(500, "Category creation failed!");
    return next(error);
  }

  res.status(201).json("Category created");
};

const getCategories = async (req, res, next) => {
  let categories;

  try {
    categories = await Category.find();
  } catch (err) {
    const error = new HttpError(
      500,
      "Can't fetch users. Something went wrong!"
    );
    return next(error);
  }

  res.json(categories.map((category) => category.toObject()));
};

const deleteCategory = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({ category_id: req.body._id });
    console.log(products);
  } catch (err) {
    const error = new HttpError(500, "Error occurred while fetching product");
    return next(error);
  }

  products.forEach((product) => {
    const tryRemove = async () => {
      try {
        await product.remove();
      } catch (err) {
        const error = new HttpError(
          500,
          "Error occurred while removing product"
        );
        return next(error);
      }
    };
    tryRemove();
  });

  let category;
  try {
    category = await Category.findById(req.body._id);
    await category.remove();
  } catch (err) {
    const error = new HttpError(500, "Error occurred while fetching category");
    return next(error);
  }

  res.json("removed successfully");
};

const updateCategory = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({ category_id: req.body._id });
  } catch (err) {
    const error = new HttpError(500, "Error occurred while fetching product");
    return next(error);
  }

  products.forEach((product) => {
    const tryUpdate = async () => {
      try {
        product.category_name = req.body.newName;
        await product.save();
      } catch (err) {
        const error = new HttpError(
          500,
          "Error occurred while updateing product"
        );
        return next(error);
      }
    };
    tryUpdate();
  });

  let category;
  try {
    category = await Category.findById(req.body._id);
    category.name = req.body.newName;
    await category.save();
  } catch (err) {
    const error = new HttpError(500, "Error occurred while fetching category");
    return next(error);
  }

  res.json("updated successfully!");
};

module.exports = {
  saveCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
