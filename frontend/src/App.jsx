import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/components/auth/index.jsx";
import NoteTakingApp from "@/components/NoteEditor.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/notes" element={<NoteTakingApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
