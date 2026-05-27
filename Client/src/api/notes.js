import api from "./axios.js";

export const getNotes = (page = 1, limit = 12) =>
  api.get(`/notes?page=${page}&limit=${limit}`).then((r) => r.data);

export const getNoteById = (id) => api.get(`/notes/${id}`).then((r) => r.data);

export const searchNotes = (q) =>
  api.get(`/notes/search?q=${encodeURIComponent(q)}`).then((r) => r.data);

export const getNotesByFaculty = (faculty) =>
  api.get(`/notes/faculty/${encodeURIComponent(faculty)}`).then((r) => r.data);

export const getNotesBySemester = (semester) =>
  api.get(`/notes/semester/${encodeURIComponent(semester)}`).then((r) => r.data);

export const createNote = (formData) =>
  api
    .post("/notes", formData)
    .then((r) => r.data);

export const updateNote = (id, formData) =>
  api
    .put(`/notes/${id}`, formData)
    .then((r) => r.data);

export const deleteNote = (id) => api.delete(`/notes/${id}`).then((r) => r.data);
