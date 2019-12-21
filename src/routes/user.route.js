import { Router } from "express";
import {
  loginAdmin,
  loginUser,
  regisUser,
  regisAdmin,
  getPhotoProfile,
  updateUserAndAdmin,
  findUserById
} from "../controllers/user.controller";
import UserService from "../services/user.service";
import multer from "multer";
import fs from "fs";
import path from "path";

const getPath = () => {
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
      "\\.hotel\\path\\to\\temporary\\directory\\to\\image\\uploaded\\files"
  );
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
  return targetPath;
};

const upload = multer({
  dest: getPath()
  // "C:/Users/Enigmacamp/.hotel/path/to/temporary/directory/to/image/uploaded/files"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const UserRoute = new Router()
  .post("/login/admin", (req, res) => loginAdmin(req, res, new UserService()))
  .post("/login/user", (req, res) => loginUser(req, res, new UserService()))
  .post("/register/admin", (req, res) =>
    regisAdmin(req, res, new UserService())
  )
  .post("/register/user", (req, res) => regisUser(req, res, new UserService()))
  .post("/profile", (req, res) => getPhotoProfile(req, res, new UserService()))
  .put("/user", upload.array("photo"), (req, res) =>
    updateUserAndAdmin(req, res, new UserService())
  )
  .get("/find/id", (req, res) => findUserById(req, res, new UserService()));

export default UserRoute;
