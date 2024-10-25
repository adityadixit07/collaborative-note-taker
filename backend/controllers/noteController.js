class NoteWebSocketHandler {
  constructor(io) {
    this.io = io;
    this.activeUsers = new Map(); // noteId -> Set of active users
  }

  handleConnection(socket) {
    const userId = socket.user.id; // Assuming auth middleware sets this

    socket.on("note:join", async (noteId) => {
      // Join the note's room
      socket.join(`note:${noteId}`);

      // Track active users
      if (!this.activeUsers.has(noteId)) {
        this.activeUsers.set(noteId, new Set());
      }
      this.activeUsers.get(noteId).add(userId);

      // Broadcast user joined to others
      socket.to(`note:${noteId}`).emit("user:joined", {
        userId,
        username: socket.user.username,
      });

      // Send current active users to the joining user
      socket.emit("active:users", Array.from(this.activeUsers.get(noteId)));
    });

    socket.on("note:update", async (data) => {
      try {
        const { noteId, content, cursorPosition } = data;

        // Save the update
        const noteService = new NoteService();
        await noteService.updateNoteContent(
          noteId,
          userId,
          content,
          cursorPosition
        );

        // Broadcast to others in real-time
        socket.to(`note:${noteId}`).emit("note:updated", {
          content,
          userId,
          cursorPosition,
        });
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    socket.on("cursor:move", (data) => {
      const { noteId, position } = data;
      socket.to(`note:${noteId}`).emit("cursor:moved", {
        userId,
        username: socket.user.username,
        position,
      });
    });

    socket.on("disconnect", () => {
      // Remove user from active users and notify others
      for (const [noteId, users] of this.activeUsers.entries()) {
        if (users.has(userId)) {
          users.delete(userId);
          socket.to(`note:${noteId}`).emit("user:left", { userId });
        }
      }
    });
  }
}
