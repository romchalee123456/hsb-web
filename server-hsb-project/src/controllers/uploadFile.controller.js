const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const util = require("util");
const fs = require("fs");
const { connect } = require('tls');

const writeFileAsync = util.promisify(fs.writeFile); 

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "files")); // Save files to the "files" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  }
});

const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  storage: storage,
}).array("file");

exports.uploadFileHouseDetail = async (req, res) => {
  // Use the upload middleware to handle file uploads
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const id = req.body.id;
      const files = req.body.files;

      console.log(files);
      // Iterate over the uploaded files and save the file information in the database
      for (const file of files) {
        const filename = file.name;
        console.log(file);
     
    const filepath = path.join(__dirname, "files", filename);
    const filepathdb = path.join("files", filename);

    // Save base64 data to a file
    if (file.base64 !== "") {
      let base64Image = file.base64.split(";base64,").pop();
      await writeFileAsync(filepath, base64Image, { encoding: "base64" });
      console.log("File created");
    }
    await prisma.file.create({
      data: {
        fileName: filename,
        filePath: filepathdb,
        statusId: 1,
        houseDetailId: id,
        backUpStatus: 1,
        fileBackupPath: '',
      },
    });

      }

      res.status(200).json({ message: "Files uploaded successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
