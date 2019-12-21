import HotelRepository from "../repositories/hotel.repository";
import { logErrorEvent } from "../events/logging.event";
import fs from "fs";
import path from "path";
import HotelImageRepository from "../repositories/hotel-image.repository";

const hotelRepository = new HotelRepository();
const hotelImageRepository = new HotelImageRepository();

export const detailHotel = async (req, res, hotelService) => {
  try {
    const result = await hotelService
      .setRepository(hotelRepository)
      .getDetailHotel();
    for (let i = 0; i < result.length; i++) {
      if (result[i].images.length > 0) {
        for (let j = 0; j < result[i].images.length; j++) {
          let src = new Buffer(
            fs.readFileSync(result[i].images[j].sourceImage)
          ).toString("base64");
          result[i].images[j].sourceImage = src;
        }
      }
    }
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const uploadImagesHotel = async (req, res, hotelService) => {
  try {
    let listImagesHotel = [];
    for (let i = 0; i < req.files.length; i++) {
      const tempPath = req.files[i].path;
      const hotelCode = req.body.hotelCode;

      let targetPath = path.join("E:/Image/temp/hotel/" + hotelCode + "/");

      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      let filesLength = fs.readdirSync(targetPath).length;
      let forImageName = hotelCode + "img" + (filesLength + 0 + 1);
      targetPath = path.join(
        "E:/Image/temp/hotel/" + hotelCode + "/" + forImageName + ".png"
      );
      if (
        path.extname(req.files[i].originalname).toLowerCase() === ".png" ||
        path.extname(req.files[i].originalname).toLowerCase() === ".jpg" ||
        path.extname(req.files[i].originalname).toLowerCase() === ".jpeg"
      ) {
        fs.renameSync(tempPath, targetPath);
        const imageHotel = {
          hotelId: req.body.idHotel,
          sourceImage: targetPath
        };
        listImagesHotel.push(imageHotel);
      } else {
        fs.unlink(tempPath, err => {
          if (err) logErrorEvent.emit("CONTROLLER", err, res);
        });
      }
    }
    const result = await hotelService
      .setRepository(hotelImageRepository)
      .uploadHotelImages(listImagesHotel);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const getImagesHotel = async (req, res, hotelService) => {
  try {
    const result = await hotelService
      .setRepository(hotelImageRepository)
      .getListImagesHotelByHotelId(req.body.idHotel);
    for (let i = 0; i < result.length; i++) {
      let src = new Buffer(fs.readFileSync(result[i].sourceImage)).toString(
        "base64"
      );
      result[i].sourceImage = src;
    }
    return res.status(200).json(result);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER", error, res);
  }
};

export const deleteImagesHotel = async (req, res, hotelService) => {
  try {
    const result = await hotelService
      .setRepository(hotelImageRepository)
      .deleteHotelImageServ(req.body.idHotelImage);
    return res.status(200).json(result);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
