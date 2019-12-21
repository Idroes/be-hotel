import { Router } from "express";
import UserService from "../services/user.service";
import { topupUser } from "../controllers/user.controller";
import DetailService from "../services/trx-detail.service";
import {
  trxBooking,
  trxUpdateBooking,
  trxFoodBeverage
} from "../controllers/transaction.controller";

const TransactionRoute = new Router()
  .post("/topup", (req, res) => topupUser(req, res, new UserService()))
  .post("/booking", (req, res) => trxBooking(req, res, new DetailService()))
  .post("/update-booking", (req, res) =>
    trxUpdateBooking(req, res, new DetailService())
  )
  .post("/food", (req, res) =>
    trxFoodBeverage(req, res, new TrxFoodBeverageService())
  );

export default TransactionRoute;
