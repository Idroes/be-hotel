import { Router } from "express";
import {
  listRoom,
  addRoom,
  updateRoom,
  deleteRoom,
  uploadImagesRoom,
  getImagesRoom,
  deleteImagesRoom,
  activationRoom,
  listRoomActive
} from "../controllers/room.controller";
import RoomService from "../services/room.service";
import multer from "multer";

const upload = multer({
  dest: "./path/to/temporary/directory/to/image/uploaded/files"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const RoomRoute = new Router()
  .get("/", (req, res) => listRoom(req, res, new RoomService()))
  .get("/available", (req, res) => listRoomActive(req, res, new RoomService()))
  .post("/", (req, res) => {
    addRoom(req, res, new RoomService());
  })
  .put("/", (req, res) => {
    updateRoom(req, res, new RoomService());
  })
  .delete("/", (req, res) => {
    deleteRoom(req, res, new RoomService());
  })
  .post("/upload/images", upload.array("imageRoom"), (req, res) =>
    uploadImagesRoom(req, res, new RoomService())
  )
  .get("/images", (req, res) => getImagesRoom(req, res, new RoomService()))
  .delete("/upload/images", (req, res) =>
    deleteImagesRoom(req, res, new RoomService())
  )
  .put("/activation", (req, res) => {
    activationRoom(req, res, new RoomService());
  });

export default RoomRoute;
