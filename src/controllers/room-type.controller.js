import { logErrorEvent } from "../events/logging.event";
import RoomTypeRepository from "../repositories/room-type.repository";

const roomTypeRepository = new RoomTypeRepository();

export const listType = async (req, res, roomTypeService) => {
  try {
    const result = await roomTypeService
      .setRepository(roomTypeRepository)
      .getListTypeRoom();
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const addTypeRoom = async (req, res, roomTypeService) => {
  try {
    const body = { ...req.body };
    const result = await roomTypeService
      .setRepository(roomTypeRepository)
      .addTypeRoom(body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const updateTypeRoom = async (req, res, roomTypeService) => {
  try {
    const body = { ...req.body };
    const result = await roomTypeService
      .setRepository(roomTypeRepository)
      .updateTypeRoom(body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const deleteTypeRoom = async (req, res, roomTypeService) => {
  try {
    const body = { ...req.body };
    const result = await roomTypeService
      .setRepository(roomTypeRepository)
      .deleteTypeRoom(body);
    return res.status(200).json(result);
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
