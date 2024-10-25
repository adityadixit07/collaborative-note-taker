import mongoose from "mongoose";
const WorkspaceSchema = new mongoose.Schema(
  {
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    description: String,
  },
  { timestamps: true }
);
const Workspace = mongoose.model("Workspace", WorkspaceSchema);
export default Workspace;
