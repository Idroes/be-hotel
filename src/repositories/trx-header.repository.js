import { getRepository } from "typeorm";
import HeaderSchema from "../entities/trx-header.schema";

export default class HeaderRepository {
  headerRepository() {
    return getRepository(HeaderSchema);
  }

  async findAll() {
    return await this.headerRepository().find();
  }

  async addTrx(header) {
    return await this.headerRepository().save(header);
  }
}
