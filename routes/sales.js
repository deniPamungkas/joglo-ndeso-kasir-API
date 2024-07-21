import { Router } from "express";
import { authenticateToken } from "../middlewares/jwt.js";
import {
  getAllOrders,
  getOrdersByDate,
  getSixMonthOrders,
  getSixMonthOrdersSum,
  getThisDayOrders,
  getThisMonthOrders,
  getThisWeekOrders,
  getThisYearOrders,
} from "../controllers/sales.js";

const route = Router();
route.get("/six-month", authenticateToken, getSixMonthOrders);
route.get("/sixx-month", authenticateToken, getSixMonthOrdersSum);
route.get("/this-year", authenticateToken, getThisYearOrders);
route.get("/this-month", authenticateToken, getThisMonthOrders);
route.get("/this-week", authenticateToken, getThisWeekOrders);
route.get("/this-day", authenticateToken, getThisDayOrders);
route.get("/", authenticateToken, getAllOrders);
// route.get("/deleteAll", deleteAll);
route.post("/get-orders-by-date", authenticateToken, getOrdersByDate);

export default route;
