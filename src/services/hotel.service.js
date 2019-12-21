export default class HotelService {
  setRepository(repo) {
    this.repo = repo;
    return this;
  }

  async getDetailHotel() {
    return await this.repo.detailHotel();
  }

  async uploadHotelImages(listImageHotel) {
    return await this.repo.addImageHotel(listImageHotel);
  }

  async getListImagesHotelByHotelId(id) {
    return await this.repo.findHotelImageByHotelId(id);
  }

  async deleteHotelImageServ(id) {
    return await this.repo.deleteImageHotel(id);
  }
}
