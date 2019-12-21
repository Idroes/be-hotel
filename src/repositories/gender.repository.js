import { getRepository } from "typeorm";
import GenderSchema from "../entities/gender.schema";

export default class GenderRepository {
  genderRepository() {
    return getRepository(GenderSchema);
  }

  async findGender(genderCode) {
    return await this.genderRepository().findOne({
      where: { codeGender: genderCode }
    });
  }
}
