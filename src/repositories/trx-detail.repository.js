import { getRepository } from "typeorm";
import DetailSchema from "../entities/trx-detail.schema";

export default class DetailRepository {
  detailRepository() {
    return getRepository(DetailSchema);
  }

  async addTrx(detail) {
    return await this.detailRepository().save(detail);
  }
}
