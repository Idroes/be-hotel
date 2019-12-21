export default class RoomTypeService {
  setRepository(repo) {
    this.repo = repo;
    return this;
  }

  async getListTypeRoom() {
    return await this.repo.listType();
  }

  async addTypeRoom(roomType) {
    return await this.repo.addTypeRoom(roomType);
  }

  async updateTypeRoom(roomType) {
    return await this.repo.updateTypeRoom(roomType);
  }

  async deleteTypeRoom(roomType) {
    roomType.statusTypeRoom = 0;
    return await this.repo.deleteTypeRoom(roomType);
  }
}
