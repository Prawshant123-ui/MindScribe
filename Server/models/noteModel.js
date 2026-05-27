const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
    },
    pdfUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notes", noteSchema);
