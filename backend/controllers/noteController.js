import Note from "../models/Note.js";
export class NotesController {
  async createNote(req, res, next) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "User id is required" });
      }
      const newNote = await Note.create(req.body);
      newNote.owner = userId;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getNotes(req, res, next) {
    try {
      const notes = await Note.find();
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getNoteById(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findById(id);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.status(200).json(note);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async updateNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.status(200).json(note);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async deleteNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findByIdAndDelete(id);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.status(200).json({ message: "Note deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
