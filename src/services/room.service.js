import HotelRepository from "../repositories/hotel.repository";

export default class RoomService {
  setRepository(repo) {
    this.repo = repo;
    return this;
  }

  async getListRoom() {
    return await this.repo.listRoom();
  }

  async getListRoomActive() {
    return await this.repo.listRoomAvailable();
  }

  async addRoom(room) {
    let newRoom = room;
    let hotel = await new HotelRepository().findHotelByCode(room.hotelId);
    let countRows = await this.repo.findRoomByHotelId(hotel.idHotel);
    let temp = hotel.hotelName.split(" ");
    let roomCode = "";
    for (let i = 0; i < temp.length; i++) {
      roomCode = roomCode + temp[i].charAt(0).toUpperCase();
    }
    roomCode = roomCode + (countRows.length + 1);

    newRoom.roomCode = roomCode;
    newRoom.hotelId = hotel.idHotel;
    newRoom.roomNo = countRows.length + 1;
    newRoom.statusRoom = 1;

    return await this.repo.addRoom(newRoom);
  }

  async updateRoom(room) {
    return await this.repo.updateRoom(room);
  }

  async activationRoomServ(room) {
    room.statusRoom = 1;
    return await this.repo.updateRoom(room);
  }

  async deleteRoom(room) {
    room.statusRoom = 3;
    return await this.repo.deleteRoom(room);
  }

  async uploadRoomImages(listImageRoom) {
    return await this.repo.addImageRoom(listImageRoom);
  }

  async getListImagesRoomByRoomId(id) {
    return await this.repo.findRoomImageByRoomId(id);
  }

  async deleteRoomImageServ(id) {
    return await this.repo.deleteImageRoom(id);
  }
}
