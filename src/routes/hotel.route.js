import { Router } from "express";
import {
  detailHotel,
  uploadImagesHotel,
  getImagesHotel,
  deleteImagesHotel
} from "../controllers/hotel.controller";
import HotelService from "../services/hotel.service";
import multer from "multer";

const upload = multer({
  dest: "./path/to/temporary/directory/to/image/uploaded/files"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const HotelRoute = new Router()
  .get("/", (req, res) => detailHotel(req, res, new HotelService()))
  .post("/upload/images", upload.array("imageHotel"), (req, res) =>
    uploadImagesHotel(req, res, new HotelService())
  )
  .get("/images", (req, res) => getImagesHotel(req, res, new HotelService()))
  .delete("/upload/images", (req, res) =>
    deleteImagesHotel(req, res, new HotelService())
  );

export default HotelRoute;
