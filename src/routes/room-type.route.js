import { Router } from "express";
import {
  listType,
  addTypeRoom,
  updateTypeRoom,
  deleteTypeRoom
} from "../controllers/room-type.controller";
import RoomTypeService from "../services/room-type.service";

const RoomTypeRoute = new Router()
  .get("/", (req, res) => listType(req, res, new RoomTypeService()))
  .post("/", (req, res) => {
    addTypeRoom(req, res, new RoomTypeService());
  })
  .put("/", (req, res) => {
    updateTypeRoom(req, res, new RoomTypeService());
  })
  .delete("/", (req, res) => {
    deleteTypeRoom(req, res, new RoomTypeService());
  });

export default RoomTypeRoute;
