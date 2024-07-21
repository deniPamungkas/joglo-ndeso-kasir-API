import { Router } from "express";
import {
  addNewMenu,
  deleteAll,
  deleteProduct,
  editMenu,
  getAllProducts,
  updateMenu,
} from "../controllers/admin.js";
import { authenticateToken } from "../middlewares/jwt.js";
import { validateProduct } from "../middlewares/joi.js";

const route = Router();
route.get("/", authenticateToken, getAllProducts);
route.post("/", authenticateToken, validateProduct, addNewMenu);
route.delete("/", authenticateToken, deleteProduct);
route.post("/editProduct", editMenu);
route.patch("/:id", authenticateToken, updateMenu);
route.delete("/deleteAll", deleteAll);

export default route;
