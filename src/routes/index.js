import express from "express";
import UserRoute from "./user.route";
import HotelRoute from "./hotel.route";
import RoomRoute from "./room.route";
import TransactionRoute from "./transaction.route";
import RoomTypeRoute from "./room-type.route";
import FoodBeverageRoute from "./food-beverage.route";

export default express
  .Router()
  .use("/auth", UserRoute)
  .use("/hotel", HotelRoute)
  .use("/room", RoomRoute)
  .use("/trx", TransactionRoute)
  .use("/room-type", RoomTypeRoute)
  .use("/food", FoodBeverageRoute);
