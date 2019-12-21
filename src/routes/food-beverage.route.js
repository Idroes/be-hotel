import { Router } from "express";
import {
  listFoodBeverage,
  addFoodBeverage,
  updateFoodBeverage,
  deleteFoodBeverage,
  uploadImagesFoodBeverage,
  getImagesFoodBeverage,
  deleteImagesFoodBeverage,
  listFoodBeverageActive
} from "../controllers/food-beverage.controller";
import FoodBeverageService from "../services/food-beverage.service";
import multer from "multer";

const upload = multer({
  dest: "./path/to/temporary/directory/to/image/uploaded/files"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const FoodBeverageRoute = new Router()
  .get("/", (req, res) => listFoodBeverage(req, res, new FoodBeverageService()))
  .get("/active", (req, res) =>
    listFoodBeverageActive(req, res, new FoodBeverageService())
  )
  .post("/", (req, res) => addFoodBeverage(req, res, new FoodBeverageService()))
  .put("/", (req, res) =>
    updateFoodBeverage(req, res, new FoodBeverageService())
  )
  .delete("/", (req, res) =>
    deleteFoodBeverage(req, res, new FoodBeverageService())
  )
  .post("/upload/images", upload.array("imageFoodBeverage"), (req, res) =>
    uploadImagesFoodBeverage(req, res, new FoodBeverageService())
  )
  .get("/images", (req, res) =>
    getImagesFoodBeverage(req, res, new FoodBeverageService())
  )
  .delete("/upload/images", (req, res) =>
    deleteImagesFoodBeverage(req, res, new FoodBeverageService())
  );

export default FoodBeverageRoute;
