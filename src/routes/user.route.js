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

const upload = multer({
  dest: "./path/to/temporary/directory/to/image/uploaded/files"
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
//       .get(
//   "/upload",
//   upload.array("file" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     const tempPath = req.files[0].path;

//     const hotelName = req.body.hotelName;
//     const idHotel = req.body.idHotel;

//     let splitName = hotelName.split(" ");
//     let nameForImage = "";
//     for (let i = 0; i < splitName.length; i++) {
//       nameForImage = nameForImage + splitName[i].charAt(0).toLowerCase();
//     }

//     let folderName = nameForImage + idHotel;
//     console.log(folderName);

//     const dir = path.resolve(__dirname, "./../uploads/" + folderName + "/");
//     fs.readdir(dir, (err, files) => {
//       if (files) {
//         nameForImage = nameForImage + (files.length + 1);

//         const targetPath = path.resolve(
//           __dirname,
//           "./../uploads/" + folderName + "/" + nameForImage + ".png"
//         );

//         if (path.extname(req.files[0].originalname).toLowerCase() === ".png") {
//           console.log(nameForImage);
//           fs.rename(tempPath, targetPath, err => {
//             console.log(targetPath);
//             if (err) return handleError(err, res);
//             console.log(nameForImage);
//             // res
//             //   .status(200)
//             //   .contentType("text/plain")
//             //   .end("File uploaded!");
//           });
//         } else {
//           fs.unlink(tempPath, err => {
//             if (err) return handleError(err, res);

//             res
//               .status(403)
//               .contentType("text/plain")
//               .end("Only .png files are allowed!");
//           });
//         }
//       } else {
//         const targetPath = path.resolve(
//           __dirname,
//           "./../uploads/" + folderName + "/" + nameForImage + ".png"
//         );

//         if (path.extname(req.files[0].originalname).toLowerCase() === ".png") {
//           console.log(nameForImage);
//           fs.rename(tempPath, targetPath, err => {
//             console.log(targetPath);
//             if (err) return handleError(err, res);
//             console.log(nameForImage);
//             res
//               .status(200)
//               .contentType("text/plain")
//               .end("File uploaded!");
//           });
//         } else {
//           fs.unlink(tempPath, err => {
//             if (err) return handleError(err, res);

//             res
//               .status(403)
//               .contentType("text/plain")
//               .end("Only .png files are allowed!");
//           });
//         }
//       }
//     });
//   }
//   // var img = fs.readFileSync(targetPath);
//   // res
//   //   .status(200)
//   //   .contentType("png")
//   //   .end(img);

//   //   fs.readdir(dir, (err, files) => {
//   //     console.log(files.length);
//   //   });
// );

export default UserRoute;
