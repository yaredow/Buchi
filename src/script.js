// scripts/uploadImages.js
const fs = require("fs");
const path = require("path");
const cloudinary = require("../src/lib/cloudinary");

const breedsFolder = path.join(__dirname, "..", "public", "breeds");

fs.readdir(breedsFolder, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach((file) => {
    const filePath = path.join(breedsFolder, file);
    const fileName = path.parse(file).name;

    cloudinary.uploader.upload(
      filePath,
      { public_id: `breed/${fileName}` },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
        } else {
          console.log("Uploaded successfully:", result.url);
        }
      },
    );
  });
});
