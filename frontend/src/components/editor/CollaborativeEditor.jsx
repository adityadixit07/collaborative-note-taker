import React, { useEffect, useState, useRef } from "react";
import { socket } from "../services/socket";

const CollaborativeEditor = ({ noteId, currentUser }) => {
  const [content, setContent] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [cursors, setCursors] = useState({});
  const editorRef = useRef(null);

  useEffect(() => {
    // Join the note room
    socket.emit("note:join", noteId);

    // Listen for updates from other users
    socket.on("note:updated", ({ content, userId }) => {
      if (userId !== currentUser.id) {
        setContent(content);
      }
    });

    socket.on("cursor:moved", ({ userId, username, position }) => {
      setCursors((prev) => ({
        ...prev,
        [userId]: { position, username },
      }));
    });

    socket.on("user:joined", (user) => {
      setActiveUsers((prev) => [...prev, user]);
    });

    socket.on("user:left", ({ userId }) => {
      setActiveUsers((prev) => prev.filter((user) => user.id !== userId));
      setCursors((prev) => {
        const newCursors = { ...prev };
        delete newCursors[userId];
        return newCursors;
      });
    });

    return () => {
      socket.off("note:updated");
      socket.off("cursor:moved");
      socket.off("user:joined");
      socket.off("user:left");
    };
  }, [noteId]);

  const handleContentChange = (newContent) => {
    setContent(newContent);

    // Emit update to server
    socket.emit("note:update", {
      noteId,
      content: newContent,
      cursorPosition: editorRef.current?.selectionStart,
    });
  };

  const handleCursorMove = (e) => {
    const position = e.target.selectionStart;
    socket.emit("cursor:move", {
      noteId,
      position,
    });
  };

  return (
    <div className="collaborative-editor">
      <div className="active-users">
        {activeUsers.map((user) => (
          <span key={user.id} className="user-badge">
            {user.username}
          </span>
        ))}
      </div>

      <textarea
        ref={editorRef}
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        onSelect={handleCursorMove}
      />

      {/* Render cursors */}
      {Object.entries(cursors).map(([userId, { position, username }]) => (
        <div key={userId} className="remote-cursor" style={{ top: position }}>
          <div className="cursor-label">{username}</div>
        </div>
      ))}
    </div>
  );
};

export default CollaborativeEditor;
