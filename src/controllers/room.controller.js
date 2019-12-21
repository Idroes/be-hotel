import RoomRepository from "../repositories/room.repository";
import { logErrorEvent } from "../events/logging.event";
import fs from "fs";
import path from "path";
import RoomImageRepository from "../repositories/room-image.repository";

const roomRepository = new RoomRepository();
const roomImageRepository = new RoomImageRepository();

export const listRoom = async (req, res, roomService) => {
  try {
    const result = await roomService
      .setRepository(roomRepository)
      .getListRoom();
    console.log(result);
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

export const listRoomActive = async (req, res, roomService) => {
  try {
    const result = await roomService
      .setRepository(roomRepository)
      .getListRoomActive();
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

export const addRoom = async (req, res, roomService) => {
  try {
    const body = { ...req.body };
    const result = await roomService
      .setRepository(roomRepository)
      .addRoom(body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const updateRoom = async (req, res, roomService) => {
  try {
    const body = { ...req.body };
    const result = await roomService
      .setRepository(roomRepository)
      .updateRoom(body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const deleteRoom = async (req, res, roomService) => {
  try {
    const body = { ...req.body };
    const result = await roomService
      .setRepository(roomRepository)
      .deleteRoom(body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const uploadImagesRoom = async (req, res, roomService) => {
  try {
    let listImagesRoom = [];
    for (let i = 0; i < req.files.length; i++) {
      const tempPath = req.files[i].path;
      const roomCode = req.body.roomCode;

      let targetPath = path.join("E:/Image/temp/room/" + roomCode + "/");

      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      let filesLength = fs.readdirSync(targetPath).length;
      let forImageName = roomCode + "img" + (filesLength + 0 + 1);
      targetPath = path.join(
        "E:/Image/temp/room/" + roomCode + "/" + forImageName + ".png"
      );
      if (
        path.extname(req.files[i].originalname).toLowerCase() === ".png" ||
        path.extname(req.files[i].originalname).toLowerCase() === ".jpg" ||
        path.extname(req.files[i].originalname).toLowerCase() === ".jpeg"
      ) {
        fs.renameSync(tempPath, targetPath);
        const imageRoom = {
          roomId: req.body.idRoom,
          sourceImage: targetPath
        };
        listImagesRoom.push(imageRoom);
      } else {
        fs.unlink(tempPath, err => {
          if (err) logErrorEvent.emit("CONTROLLER", err, res);
        });
      }
    }
    const result = await roomService
      .setRepository(roomImageRepository)
      .uploadRoomImages(listImagesRoom);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const getImagesRoom = async (req, res, roomService) => {
  try {
    const result = await roomService
      .setRepository(roomImageRepository)
      .getListImagesRoomByRoomId(req.body.idRoom);
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

export const deleteImagesRoom = async (req, res, roomService) => {
  try {
    const result = await roomService
      .setRepository(roomImageRepository)
      .deleteRoomImageServ(req.body.idRoomImage);
    return res.status(200).json(result);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const activationRoom = async (req, res, roomService) => {
  try {
    const body = { ...req.body };
    const result = await roomService
      .setRepository(roomRepository)
      .activationRoomServ(body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
