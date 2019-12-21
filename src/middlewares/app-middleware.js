import express from "express";
import session from "express-session";
import fs from "fs";
import path from "path";

export default express
  .Router()
  .use(
    session({
      secret: "hello-secret",
      resave: false,
      rolling: true,
      saveUninitialized: true,
      cookie: { maxAge: 15000 }
    })
  )
  // .use(() => {
  //   let targetPath = path.join("C:\\Users");
  //   let forTargetPath;
  //   for (let i = 0; i < fs.readdirSync(targetPath).length; i++) {
  //     if (
  //       fs.readdirSync(targetPath)[i] !== "All Users" &&
  //       fs.readdirSync(targetPath)[i] !== "Default" &&
  //       fs.readdirSync(targetPath)[i] !== "Default User" &&
  //       fs.readdirSync(targetPath)[i] !== "defaultuser0" &&
  //       fs.readdirSync(targetPath)[i] !== "desktop.ini" &&
  //       fs.readdirSync(targetPath)[i] !== "Public"
  //     ) {
  //       forTargetPath = fs.readdirSync(targetPath)[i];
  //     }
  //   }
  //   targetPath = path.join(
  //     "C:\\Users\\" +
  //       forTargetPath +
  //       "\\.hotel\\path\\to\\temporary\\directory\\to\\image\\uploaded\\files"
  //   );
  //   if (!fs.existsSync(targetPath)) {
  //     fs.mkdirSync(targetPath, { recursive: true });
  //   }
  //   express.json();
  // });
  .use(express.json());
