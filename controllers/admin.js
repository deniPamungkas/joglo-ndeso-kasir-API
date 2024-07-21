import orderSchema from "../models/order.js";
import menuSchema from "../models/menu.js";

export const addNewMenu = async (req, res) => {
  const newMenu = new menuSchema({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    profit: req.body.profit,
    amount: 1,
  });
  try {
    const result = await newMenu.save();
    return res
      .status(200)
      .json({ message: "Success adding new menu", data: result });
  } catch (error) {
    //if menu already exist
    if (error.keyValue) {
      return res.status(409).json({
        message: "Failed to add new menu",
        error: error.keyValue.name + " sudah ada dalam menu",
      });
    }
    return res.status(500).json(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await menuSchema.find().sort({ category: 1 });
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await menuSchema.findOneAndDelete({ name: req.query.name });
    if (product) {
      return res
        .status(200)
        .json({ message: "Success delete product", data: product });
    } else {
      return res
        .status(404)
        .json({ message: "Not found", error: "No such any product" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete product",
      error: "internal server error",
    });
  }
};

export const editMenu = async (req, res) => {
  try {
    const menu = await menuSchema.findOne({ name: req.body.name });
    return res.status(200).json(menu);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateMenu = async (req, res) => {
  try {
    const menu = await menuSchema.findByIdAndUpdate(req.params.id);
    if (menu) {
      menu.name = req.body.name;
      menu.price = req.body.price;
      menu.category = req.body.category;
      menu.profit = req.body.profit;

      const editedMenu = await menu.save();
      return res
        .status(200)
        .json({ message: "Menu updated!", data: editedMenu });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Menu is not exist", error: "not found" });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const result = await orderSchema.deleteMany({});
    return res.status(200).json("berhasil hapus");
  } catch (error) {
    return res.status(400).json("gagal");
  }
};
