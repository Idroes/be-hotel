/\* contoh uplaod file dan save ke direktori yang diinginkan
import express from "express";
import { logErrorEvent, logInfoEvent } from "../events/logging.event";
import fs from "fs";
import multer from "multer";
import path from "path";

const upload = multer({
dest: "./path/to/temporary/directory/to/image/uploaded/files"
// you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const handleError = (err, res) => {
res
.status(500)
.contentType("text/plain")
.end("Oops! Something went wrong!");
};

export default express.Router().get(
"/upload",
upload.array("file", /_ name attribute of <file> element in your form _/),
(req, res) => {
const tempPath = req.files[0].path;

      const hotelName = req.body.hotelName;
      const idHotel = req.body.idHotel;

      let splitName = hotelName.split(" ");
      let nameForImage = "";
      for (let i = 0; i < splitName.length; i++) {
        nameForImage = nameForImage + splitName[i].charAt(0).toLowerCase();
      }

      let folderName = nameForImage + idHotel;

      const dir = "E:\\Image\\";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.readdir(
        dir,
        (err, files) => {
          nameForImage = nameForImage + (files.length + 1);

          let targetPath = path.join("E:/Image/" + folderName);

          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
          }

          targetPath = path.join(
            "E:/Image/" + folderName + "/" + nameForImage + ".png"
          );
          if (
            path.extname(req.files[0].originalname).toLowerCase() === ".png"
          ) {
            console.log(nameForImage);
            fs.rename(tempPath, targetPath, err => {
              if (err) return handleError(err, res);
              console.log(nameForImage);
              res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
            });
          } else {
            fs.unlink(tempPath, err => {
              if (err) return handleError(err, res);

              res
                .status(403)
                .contentType("text/plain")
                .end("Only .png files are allowed!");
            });
          }
        }
      );
    }

);
\*/

/_ cara encode file ke base64 dan decode dari base64 menjadi file
_
// function to encode file data to base64 encoded string
function base64_encode(file) {
console.log(file);
// read binary data
var bitmap = fs.readFileSync(file);
// convert binary data to base64 encoded string
return new Buffer(bitmap).toString("base64");
}

// function to create file from base64 decoded string
function base64_decode(base64str, file) {
// create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
var bitmap = new Buffer(base64str, "base64");
// write buffer to file
fs.writeFileSync(file, bitmap);
console.log("**\*\*\*\*** File created from base64 encoded string **\*\*\*\***");
}

// convert image to base64 encoded string
var base64str = base64_encode("salvarDocumento.png");
console.log(base64str);
// convert base64 string back to image
base64_decode(base64str, "copy_salvarDocumento.png");
\*/

/\* cara membaca file gambar dan mengirimkan response berupa gambar berekstensi png

// var img = fs.readFileSync(targetPath);
// res
// .status(200)
// .contentType("png")
// .end(img);
\*/

/_ untuk menghitung jumlah file dalam suatu folder
const dir = "E:\\Image\\";
fs.readdir(dir, (err, files) => {
console.log(files.length);
});
_/

/_ jika folder yang di tuju belum ada maka akan dibuat
const dir = "E:\\Image\\";
if (!fs.existsSync(dir)) {
fs.mkdirSync(dir);
}
_/
