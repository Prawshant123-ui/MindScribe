const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const filename = `${file.fieldname}-${Date.now()}`;

    let resource_type = "image";
    if (file.mimetype === "video/mp4") resource_type = "video";
    if (file.mimetype === "application/pdf") resource_type = "raw";

    return {
  folder: "mindscribe",
  public_id: filename,
  resource_type,
  format: file.mimetype === "application/pdf" ? "pdf" : undefined
};
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images, videos, and PDFs are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
});

const noteUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "videoUrl", maxCount: 1 },
  { name: "pdfUrl", maxCount: 1 },
]);

module.exports = noteUpload;