import { getRepository, Not, Equal } from "typeorm";
import RoomImageSchema from "../entities/room-image.schema";

export default class RoomImageRepository {
  roomImageRepository() {
    return getRepository(RoomImageSchema);
  }

  async findRoomImageByRoomId(id) {
    return await this.roomImageRepository().find({ where: { roomId: id } });
  }

  async addImageRoom(listRoom) {
    return await this.roomImageRepository().save(listRoom);
  }

  async deleteImageRoom(id) {
    return await this.roomImageRepository().delete(id);
  }
}
