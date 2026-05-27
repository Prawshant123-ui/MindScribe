const Notes = require("../models/noteModel");

const createNote = async (req, res) => {
  try {
  
    const { subject, content, faculty, semester, description } = req.body;

    if (!subject || !faculty || !semester) {
      return res.status(400).json({ message: "Subject, faculty and semester are required" });
    }

  const pdfUrl = req.files?.pdfUrl?.[0]?.path;
const videoUrl = req.files?.videoUrl?.[0]?.path;
const thumbnail = req.files?.thumbnail?.[0]?.path;

    const note = await Notes.create({
      subject,
      content,
      faculty,
      semester,
      description,
      thumbnail,
      videoUrl,
      pdfUrl,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error("createNote error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Notes.countDocuments();

    const notes = await Notes.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotesById = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found!!" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchNotes = async (req, res) => {
  try {
    const keyword = req.query.q || "";

    const notes = await Notes.find({
      subject: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotesByFaculty = async (req, res) => {
  try {
    const notes = await Notes.find({
      faculty: req.params.faculty,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotesBySemester = async (req, res) => {
  try {
    const notes = await Notes.find({
      semester: req.params.semester,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNotes = async (req, res) => {
  try {
    const {
      subject,
      content,
      faculty,
      semester,
      description,
      thumbnail,
      pdfUrl,
      videoUrl,
    } = req.body;

    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Notes not found!!" });
    }

    const uploadedThumbnail = req.files?.thumbnail?.[0]?.path;
    const uploadedVideoUrl = req.files?.videoUrl?.[0]?.path;
    const uploadedPdfUrl = req.files?.pdfUrl?.[0]?.path;

    note.subject = subject || note.subject;
    note.content = content || note.content;
    note.faculty = faculty || note.faculty;
    note.semester = semester || note.semester;
    note.description = description || note.description;

    note.thumbnail = uploadedThumbnail || thumbnail || note.thumbnail;
    note.videoUrl = uploadedVideoUrl || videoUrl || note.videoUrl;
    note.pdfUrl = uploadedPdfUrl || pdfUrl || note.pdfUrl;

    const updatedNotes = await note.save();

    res.status(200).json(updatedNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Notes not found!!" });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNotesById,
  searchNotes,
  getNotesByFaculty,
  getNotesBySemester,
  updateNotes,
  deleteNotes,
};
