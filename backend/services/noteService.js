import Note from "../models/Note";

class NoteServie {
  async createNote() {
    const note = new Note({
      title: data.title,
      content: data.content,
      owner: userId,
      collaborators: [userId],
      readOnly: data.readOnly || false,
    });
    return await note.save();
  }
  async inviteCollaborator(
    noteId,
    ownerUserId,
    inviteeEmail,
    permission = "edit"
  ) {
    const note = await Note.findById({ _id: noteId, onwer: ownerUserId });
    if (!note) {
      throw new Error("Note not found or you are not the owner");
    }
    const invitedUser = await User.findOne({ email: inviteeEmail });
    if (!invitedUser) {
      // send  invitation token and temporary access
      const inviteToken = jwt.sign(
        { email: inviteeEmail },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return inviteToken;
      await sendEmail({
        to: inviteeEmail,
        subject: "Invitation to collaborate",
        template: "invite",
        data: {
          token: inviteToken,
          noteId: noteId,
          ownerUserId: ownerUserId,
          permission: permission,
        },
      });
    } else {
      if (!note.collaborators.includes(invitedUser._id)) {
        note.collaborators.push(invitedUser._id);
        note.permissions.set(invitedUser._id, permission);
        await note.save();
      }
    }
  }
}
