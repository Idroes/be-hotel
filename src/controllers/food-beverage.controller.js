import { logErrorEvent } from "../events/logging.event";
import FoodBeverageRepository from "../repositories/food-beverage.repository";
import FoodBeverageImageRepository from "../repositories/food-beverage-image.repository";
import path from "path";
import fs from "fs";

const foodBeverageRepository = new FoodBeverageRepository();
const foodBeverageImageRepository = new FoodBeverageImageRepository();

export const listFoodBeverageActive = async (req, res, foodBeverageService) => {
  try {
    const result = await foodBeverageService
      .setRepository(foodBeverageRepository)
      .getListFoodBeverageActive();
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      if (result[i].imagesFoodBeverage.length > 0) {
        for (let j = 0; j < result[i].imagesFoodBeverage.length; j++) {
          let src = new Buffer(
            fs.readFileSync(result[i].imagesFoodBeverage[j].sourceImage)
          ).toString("base64");
          result[i].imagesFoodBeverage[j].sourceImage = src;
        }
      }
    }
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const listFoodBeverage = async (req, res, foodBeverageService) => {
  try {
    const result = await foodBeverageService
      .setRepository(foodBeverageRepository)
      .getListFoodBeverage();
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      if (result[i].imagesFoodBeverage.length > 0) {
        for (let j = 0; j < result[i].imagesFoodBeverage.length; j++) {
          let src = new Buffer(
            fs.readFileSync(result[i].imagesFoodBeverage[j].sourceImage)
          ).toString("base64");
          result[i].imagesFoodBeverage[j].sourceImage = src;
        }
      }
    }
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const addFoodBeverage = async (req, res, foodBeverageService) => {
  try {
    const result = await foodBeverageService
      .setRepository(foodBeverageRepository)
      .addFoodBeverageServ(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const updateFoodBeverage = async (req, res, foodBeverageService) => {
  try {
    const result = await foodBeverageService
      .setRepository(foodBeverageRepository)
      .updateFoodBeverageServ(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const deleteFoodBeverage = async (req, res, foodBeverageService) => {
  try {
    const result = await foodBeverageService
      .setRepository(foodBeverageRepository)
      .deleteFoodBeverageServ(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const uploadImagesFoodBeverage = async (
  req,
  res,
  foodBeverageService
) => {
  try {
    let listImagesFoodBeverage = [];
    for (let i = 0; i < req.files.length; i++) {
      const tempPath = req.files[i].path;
      const foodBeverageCode = req.body.foodBeverageCode;

      let targetPath = path.join(
        "E:/Image/temp/foodBeverage/" + foodBeverageCode + "/"
      );

      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      let filesLength = fs.readdirSync(targetPath).length;
      let forImageName = foodBeverageCode + "img" + (filesLength + 0 + 1);
      targetPath = path.join(
        "E:/Image/temp/foodBeverage/" +
          foodBeverageCode +
          "/" +
          forImageName +
          ".png"
      );
      if (
        path.extname(req.files[i].originalname).toLowerCase() === ".png" ||
        path.extname(req.files[i].originalname).toLowerCase() === ".jpg" ||
        path.extname(req.files[i].originalname).toLowerCase() === ".jpeg"
      ) {
        fs.renameSync(tempPath, targetPath);
        const imageFoodBeverage = {
          foodBeverageId: req.body.idFoodBeverage,
          sourceImage: targetPath
        };
        listImagesFoodBeverage.push(imageFoodBeverage);
      } else {
        fs.unlink(tempPath, err => {
          if (err) logErrorEvent.emit("CONTROLLER", err, res);
        });
      }
    }
    const result = await foodBeverageService
      .setRepository(foodBeverageImageRepository)
      .uploadFoodBeverageImages(listImagesFoodBeverage);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const getImagesFoodBeverage = async (req, res, foodBeverageService) => {
  try {
    const result = await foodBeverageService
      .setRepository(foodBeverageImageRepository)
      .getListImagesFoodBeverageByFoodBeverageId(req.body.idFoodBeverage);
    for (let i = 0; i < result.length; i++) {
      let src = new Buffer(fs.readFileSync(result[i].sourceImage)).toString(
        "base64"
      );
      result[i].sourceImage = src;
    }
    return res.status(200).json(result);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const deleteImagesFoodBeverage = async (
  req,
  res,
  foodBeverageService
) => {
  try {
    const result = await foodBeverageService
      .setRepository(foodBeverageImageRepository)
      .deleteFoodBeverageImageServ(req.body.idFoodBeverageImage);
    return res.status(200).json(result);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
