import GenderRepository from "../repositories/gender.repository";

export default class UserService {
  setRepository(repo) {
    this.repo = repo;
    return this;
  }

  async loginAdmin(user) {
    const result = await this.repo.loginAsAdminByUsername(
      user.usernameUser,
      user.passwordUser
    );
    const detail = {
      ...result.detail,
      typeUser: result.typeUser,
      emailUser: result.emailUser,
      usernameUser: result.usernameUser
    };
    return detail;
  }

  async loginUser(user) {
    const result = await this.repo.loginAsUserByUsername(
      user.usernameUser,
      user.passwordUser
    );
    const detail = {
      ...result.detail,
      typeUser: result.typeUser,
      emailUser: result.emailUser,
      usernameUser: result.usernameUser
    };
    return detail;
  }

  async regisAdmin(user) {
    user = { ...user, typeUser: 0, statusUser: 1 };
    return await this.repo.regisAdmin(user);
  }

  async regisUser(user) {
    user = { ...user, typeUser: 1, statusUser: 1 };
    return await this.repo.regisUser(user);
  }

  async getPhotoProfileServ(id) {
    const result = await this.repo.findDetailUserOrAdmin(id);
    const path = result.sourcePhotoProfile;
    return path;
  }

  async updateUserAndAdminServ(userDetail) {
    let getGender = await new GenderRepository().findGender(
      userDetail.genderId
    );
    userDetail.genderId = getGender.idGender;
    let getSaldo = await this.repo.findDetailUserOrAdmin(
      userDetail.idUserDetail
    );

    userDetail.saldoUser = getSaldo.saldoUser;

    await this.repo.updateUserAndAdmin(userDetail);

    let a = await this.repo.findDetailUserOrAdmin(userDetail.idUserDetail);
    return a;
  }

  async topupUserServ(id, saldo) {
    let temp = await this.repo.findDetailUserOrAdmin(id);
    let {
      idUserDetail,
      fullnameUser,
      addressUser,
      noPhoneUser,
      saldoUser,
      sourcePhotoProfile,
      genderId
    } = temp;
    saldoUser = saldo;
    const userDetail = {
      idUserDetail: idUserDetail,
      fullnameUser: fullnameUser,
      addressUser: addressUser,
      noPhoneUser: noPhoneUser,
      saldoUser: saldoUser,
      sourcePhotoProfile: sourcePhotoProfile,
      genderId: genderId
    };
    return await this.repo.updateUserAndAdmin(userDetail);
  }

  async findUserByIdServ(idUserDetail) {
    const result = await this.repo.findUserOrAdmin(idUserDetail);
    const detail = {
      ...result.detail,
      typeUser: result.typeUser,
      emailUser: result.emailUser,
      usernameUser: result.usernameUser
    };
    return detail;
  }
}
