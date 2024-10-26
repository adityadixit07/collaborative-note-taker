import React, { useEffect, useState } from "react";
import {
  Search,
  Menu,
  Plus,
  Settings,
  Star,
  Share2,
  Archive,
  Moon,
  Sun,
  Users,
  FileText,
  Clock,
  Tag,
  Folder,
  MessageSquare,
  Image,
  Paperclip,
  Code,
} from "lucide-react";
import logo from "../assets/images/logo.webp";
import { getNotes } from "../services/api/notes";

const NoteTakingApp = () => {
  const [darkMode, setDarkMode] = useState(false);

  const demoNotes = [
    {
      id: 1,
      title: "Project Planning",
      isPinned: true,
      tags: ["work", "important"],
      lastEdited: "2 mins ago",
      collaborators: 3,
    },
    {
      id: 2,
      title: "Meeting Notes",
      isPinned: false,
      tags: ["work"],
      lastEdited: "1 hour ago",
      collaborators: 2,
    },
    {
      id: 3,
      title: "Research Ideas",
      isPinned: true,
      tags: ["research", "ideas"],
      lastEdited: "2 hours ago",
      collaborators: 1,
    },
  ];

  const baseClasses = darkMode ? "bg-gray-900 text-white" : "bg-gray-50";

  useEffect(() => {
    document.title = "CollabNote";
    const getAllNotes = async () => {
      const res = await getNotes();
      console.log(res);
    };
    getAllNotes();
  }, []);

  return (
    <div className={`min-h-screen ${baseClasses}`}>
      {/* Top Navigation */}
      <nav
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } border-b shadow-sm`}
      >
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6" />
            <h1 className="text-xl font-bold">CollabNote</h1>
            <img src={logo} className="h-8 w-8 rounded-full object-contain" />
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center px-3 py-1.5 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Search className="w-4 h-4 text-gray-500" />
              <input
                placeholder="Search notes..."
                className="ml-2 bg-transparent border-none focus:outline-none"
              />
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div
          className={`w-64 ${darkMode ? "bg-gray-800" : "bg-white"} border-r`}
        >
          <div className="p-4">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600">
              <Plus className="w-5 h-5" />
              <span>New Note</span>
            </button>

            <div className="mt-6 space-y-1">
              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-blue-50"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>All Notes</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Star className="w-5 h-5" />
                <span>Favorites</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Users className="w-5 h-5" />
                <span>Shared</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Archive className="w-5 h-5" />
                <span>Archive</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="px-3 py-2 text-sm font-medium text-gray-500">
                TAGS
              </div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Tag className="w-4 h-4" />
                  <span>work</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Tag className="w-4 h-4" />
                  <span>personal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div
          className={`w-72 ${darkMode ? "bg-gray-800" : "bg-white"} border-r`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">All Notes</h2>
              <button
                className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {demoNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-white hover:bg-gray-50"
                  } border cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{note.title}</h3>
                    {note.isPinned && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          darkMode ? "bg-gray-600" : "bg-gray-100"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                    <span>{note.lastEdited}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{note.collaborators}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          <div
            className={`border-b ${darkMode ? "bg-gray-800" : "bg-white"} p-4`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <input
                  placeholder="Note title"
                  className={`text-xl font-bold bg-transparent border-none focus:outline-none ${
                    darkMode ? "placeholder-gray-500" : "placeholder-gray-400"
                  }`}
                  defaultValue="Project Planning"
                />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    A
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    B
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    C
                  </div>
                </div>
                <button
                  className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div
              className={`mb-4 flex space-x-2 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <Code className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
            <textarea
              className={`w-full h-full p-4 rounded-lg resize-none focus:outline-none ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
              placeholder="Start writing..."
              defaultValue="# Project Overview
              
This is a collaborative document for our new project. Here are the key points we need to discuss:

- [ ] Define project scope
- [ ] Set up development environment
- [ ] Create project timeline
- [ ] Assign team responsibilities

## Next Steps

1. Schedule kick-off meeting
2. Review technical requirements
3. Set up project tracking tools"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteTakingApp;
