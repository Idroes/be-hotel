import { getRepository } from "typeorm";
import RoomTypeSchema from "../entities/room-type.schema";

export default class RoomTypeRepository {
  roomTypeRepository() {
    return getRepository(RoomTypeSchema);
  }

  async listType() {
    return await this.roomTypeRepository().find();
  }

  async addTypeRoom(roomType) {
    return await this.roomTypeRepository().save(roomType);
  }

  async updateTypeRoom(roomType) {
    return await this.roomTypeRepository().update(
      roomType.idTypeRoom,
      roomType
    );
  }

  async deleteTypeRoom(roomType) {
    return await this.roomTypeRepository().update(
      roomType.idTypeRoom,
      roomType
    );
  }
}
