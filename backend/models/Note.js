import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    permissions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["read", "edit"],
          default: "read",
        },
      },
    ],
    revisions: [
      {
        content: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
export default Note;
