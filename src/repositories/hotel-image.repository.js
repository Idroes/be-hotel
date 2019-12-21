import { getRepository, Not, Equal } from "typeorm";
import HotelImageSchema from "../entities/hotel-image.schema";

export default class HotelImageRepository {
  hotelImageRepository() {
    return getRepository(HotelImageSchema);
  }

  async findHotelImageByHotelId(id) {
    return await this.hotelImageRepository().find({ where: { hotelId: id } });
  }

  async addImageHotel(listHotel) {
    return await this.hotelImageRepository().save(listHotel);
  }

  async deleteImageHotel(id) {
    return await this.hotelImageRepository().delete(id);
  }
}
