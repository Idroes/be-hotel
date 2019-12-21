import { getRepository, Not, Equal } from "typeorm";
import RoomSchema from "../entities/room.schema";

export default class RoomRepository {
  roomRepository() {
    return getRepository(RoomSchema);
  }

  async listRoom() {
    return await this.roomRepository().find(
      {
        statusType: Not(Equal(3))
      },
      {
        relations: ["images"]
      }
    );
  }

  async listRoomAvailable() {
    return await this.roomRepository().find(
      {
        where: {
          statusType: 1
        }
      },
      {
        relations: ["images"]
      }
    );
  }

  async findRoomByHotelId(id) {
    return await this.roomRepository().find({
      where: {
        hotelId: id
      }
    });
  }

  async findRoomByRoomCode(code) {
    return await this.roomRepository().find({
      where: {
        roomCode: code
      }
    });
  }

  async addRoom(room) {
    return await this.roomRepository().save(room);
  }

  async updateRoom(room) {
    return await this.roomRepository().update(room.idRoom, room);
  }

  async deleteRoom(room) {
    return await this.roomRepository().update(room.idRoom, room);
  }
}
