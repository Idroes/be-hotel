import { getRepository } from "typeorm";
import HotelSchema from "../entities/hotel.schema";

export default class HotelRepository {
  hotelRepository() {
    return getRepository(HotelSchema);
  }

  async detailHotel() {
    return await this.hotelRepository().find({
      relations: ["images"]
    });
  }

  async findHotelByCode(id) {
    return await this.hotelRepository().findOne(
      {
        where: {
          hotelCode: id
        }
      },
      {
        relations: ["room"]
      }
    );
  }
}
