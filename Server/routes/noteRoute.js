const express = require("express");

const {
  createNote,
  getAllNotes,
  getNotesById,
  searchNotes,
  getNotesByFaculty,
  getNotesBySemester,
  updateNotes,
  deleteNotes,
} = require("../controllers/noteController");

const { protect } = require("../middlewares/authMiddleware");
const noteUpload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", protect, noteUpload, createNote);
router.get("/", getAllNotes);
router.get("/search", searchNotes);
router.get("/faculty/:faculty", getNotesByFaculty);
router.get("/semester/:semester", getNotesBySemester);
router.get("/:id", getNotesById);
router.put("/:id", protect, noteUpload, updateNotes);
router.delete("/:id", protect, deleteNotes);

module.exports = router;
