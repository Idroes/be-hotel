import { getRepository } from "typeorm";
import UserSchema from "../entities/user.schema";
import UserDetailSchema from "../entities/user-detail.schema";

export default class UserRepository {
  userRepository() {
    return getRepository(UserSchema);
  }

  userDetailRepository() {
    return getRepository(UserDetailSchema);
  }

  async loginAsAdminByUsername(usernameUser, passwordUser) {
    const user = await this.userRepository().findOne({
      where: {
        usernameUser: usernameUser,
        passwordUser: passwordUser,
        typeUser: 0
      }
    });
    return user;
  }

  async loginAsUserByUsername(usernameUser, passwordUser) {
    const user = await this.userRepository().findOne({
      where: {
        usernameUser: usernameUser,
        passwordUser: passwordUser,
        typeUser: 1
      }
    });
    return user;
  }

  async regisAdmin(user) {
    return await this.userRepository().save(user);
  }

  async regisUser(user) {
    return await this.userRepository().save(user);
  }

  async findUserOrAdmin(id) {
    const user = await this.userRepository().findOne({
      where: {
        idUser: id
      }
    });
    return user;
  }

  async findDetailUserOrAdmin(id) {
    const user = await this.userDetailRepository().findOne({
      where: {
        idUserDetail: id
      }
    });
    return user;
  }

  async updateUserAndAdmin(userDetail) {
    const result = await this.userDetailRepository().update(
      userDetail.idUserDetail,
      userDetail
    );
    console.log(result);
    return result;
  }
}
