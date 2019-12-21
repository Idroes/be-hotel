import UserRepository from "../repositories/user.repository";
import { logErrorEvent } from "../events/logging.event";
import fs from "fs";
import path from "path";
import { log } from "../logger";

const userRepository = new UserRepository();

const handleError = (err, res) => {
  console.error(err);
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

export const loginAdmin = async (req, res, userService) => {
  try {
    let forMulter =
      "C:/Users/Enigmacamp/.hotel/path/to/temporary/directory/to/image/uploaded/files";
    if (!fs.existsSync(forMulter)) {
      fs.mkdirSync(forMulter, { recursive: true });
    }
    const user = { ...req.body };
    const result = await userService
      .setRepository(userRepository)
      .loginAdmin(user);
    if (result) {
      if (result.sourcePhotoProfile) {
        let src = new Buffer(
          fs.readFileSync(result.sourcePhotoProfile)
        ).toString("base64");
        result.sourcePhotoProfile = src;
      }
      req.session.name = JSON.stringify(result);
      log.info({ transType: "USERAUTH-SUCCESS" }, result);
      res.status(200).json(result);
    } else {
      log.error({ transType: "USERAUTH-FAILED" }, user);
      res.sendStatus(401).json({ message: "Account not found" });
    }
  } catch (error) {
    logErrorEvent.emit("CONTROLLER_LOGIN", error, res);
  }
};

export const loginUser = async (req, res, userService) => {
  try {
    let forMulter =
      "C:/Users/Enigmacamp/.hotel/path/to/temporary/directory/to/image/uploaded/files";
    if (!fs.existsSync(forMulter)) {
      fs.mkdirSync(forMulter, { recursive: true });
    }
    const user = { ...req.body };
    const result = await userService
      .setRepository(userRepository)
      .loginUser(user);
    if (result) {
      if (result.sourcePhotoProfile) {
        let src = new Buffer(
          fs.readFileSync(result.sourcePhotoProfile)
        ).toString("base64");
        result.sourcePhotoProfile = src;
      }
      req.session.name = JSON.stringify(result);
      log.info({ transType: "USERAUTH-SUCCESS" }, result);
      res.status(200).json(result);
    } else {
      log.error({ transType: "USERAUTH-FAILED" }, user);
      res.sendStatus(401).json({ message: "Account not found" });
    }
  } catch (error) {
    logErrorEvent.emit("CONTROLLER_LOGIN", error, res);
  }
};

export const regisAdmin = async (req, res, userService) => {
  try {
    const user = { ...req.body };
    const result = await userService
      .setRepository(userRepository)
      .regisAdmin(user);
    return res.status(200).json({ message: "Registration Successful" });
  } catch (error) {
    logErrorEvent.emit("CONTROLLER_REGIS", error, res);
  }
};

export const regisUser = async (req, res, userService) => {
  try {
    const user = { ...req.body };
    await userService.setRepository(userRepository).regisUser(user);
    return res.status(200).json({ message: "Registration Successful" });
  } catch (error) {
    logErrorEvent.emit("CONTROLLER_REGIS", error, res);
  }
};

export const getPhotoProfile = async (req, res, userService) => {
  try {
    const id = req.body.idUserDetail;
    const result = await userService
      .setRepository(userRepository)
      .getPhotoProfileServ(id);
    const image = fs.readFileSync(result);
    return res
      .status(200)
      .contentType("png")
      .end(image);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER_GET_PROFILES", error, res);
  }
};

export const updateUserAndAdmin = async (req, res, userService) => {
  try {
    if (req.files[0]) {
      const tempPath = req.files[0].path;

      const fullname = req.body.fullnameUser;
      const idUserDetail = req.body.idUserDetail;

      let splitName = fullname.split(" ");
      let nameForImage = "";
      for (let i = 0; i < splitName.length; i++) {
        nameForImage = nameForImage + splitName[i].charAt(0).toLowerCase();
      }

      let folderName = nameForImage + idUserDetail;

      let targetPath = path.join("C:\\Users");
      let forTargetPath;
      for (let i = 0; i < fs.readdirSync(targetPath).length; i++) {
        if (
          fs.readdirSync(targetPath)[i] !== "All Users" &&
          fs.readdirSync(targetPath)[i] !== "Default" &&
          fs.readdirSync(targetPath)[i] !== "Default User" &&
          fs.readdirSync(targetPath)[i] !== "defaultuser0" &&
          fs.readdirSync(targetPath)[i] !== "desktop.ini" &&
          fs.readdirSync(targetPath)[i] !== "Public"
        ) {
          forTargetPath = fs.readdirSync(targetPath)[i];
        }
      }
      targetPath = path.join(
        "C:\\Users\\" +
          forTargetPath +
          "\\.hotel\\temp\\image\\" +
          folderName +
          "\\"
      );
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      let lengthFilesExist = fs.readdirSync(targetPath).length;
      // , (err, files) => {
      nameForImage = nameForImage + lengthFilesExist;

      targetPath = targetPath + nameForImage + ".png";
      console.log(targetPath);
      if (
        path.extname(req.files[0].originalname).toLowerCase() === ".png" ||
        path.extname(req.files[0].originalname).toLowerCase() === ".jpg" ||
        path.extname(req.files[0].originalname).toLowerCase() === ".jpeg"
      ) {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          const userDetail = {
            ...req.body,
            sourcePhotoProfile: targetPath
          };
          updateControllerTemp(res, userService, userDetail);
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) logErrorEvent.emit("CONTROLLER", err, res);
        });
      }
    } else {
      const userDetail = { ...req.body };
      const result = await userService
        .setRepository(userRepository)
        .updateUserAndAdminServ(userDetail);
      console.log(result);
      return res.status(200).json(result);
    }
  } catch (error) {
    logErrorEvent.emit("CONTROLLER_UPDATE_PROFILE", error, res);
  }
};

const updateControllerTemp = async (res, userService, userDetail) => {
  try {
    const result = await userService
      .setRepository(userRepository)
      .updateUserAndAdminServ(userDetail);
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER_UPDATE_PROFILE", error, res);
  }
};

export const topupUser = async (req, res, userService) => {
  try {
    const saldo = req.body.saldo;
    const idUserDetail = req.body.idUserDetail;
    await userService
      .setRepository(userRepository)
      .topupUserServ(idUserDetail, saldo);
    return res.status(200).json({ message: "Top Up Successful" });
  } catch (err) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};

export const findUserById = async (req, res, userService) => {
  try {
    const result = await userService
      .setRepository(userRepository)
      .findUserByIdServ(req.query.id);
    return res.status(200).json(result);
  } catch (error) {
    logErrorEvent.emit("CONTROLLER", err, res);
  }
};
