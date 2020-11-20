const multer = require("multer");
const moment = require("moment");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, __basedir + "/resources/static/assets/uploads/");
    console.log(req.body.id);
  },
  filename(req, file, cb) {
    cb(null, `${moment().format("DDMMYYYY-HHmmss_SSS")}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
