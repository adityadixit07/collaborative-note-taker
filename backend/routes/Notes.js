import express from "express";

import { NotesController } from "../controllers/noteController.js";
const notesController = new NotesController();
const router = express.Router();

router.post("/create", notesController.createNote);
router.get("/:id", notesController.getNoteById);
router.get("/", notesController.getNotes);
router.put("/:id", notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

export default router;
