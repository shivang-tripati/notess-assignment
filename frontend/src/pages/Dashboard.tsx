import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { TrashIcon } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Note {
  id: string;
  content: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");

  // Handle token from URL (OAuth or other redirects)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      navigate("/dashboard");
    }
  }, [location, navigate]);

  // Fetch user and notes
  useEffect(() => {
    axios
      .get<User>(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch(() => navigate("/signin"));

    axios
      .get<Note[]>(`${import.meta.env.VITE_BACKEND_URL}/notes`, {
        withCredentials: true,
      })
      .then((res) => setNotes(res.data));
  }, [navigate]);

  const createNote = async () => {
    if (!content.trim()) return;

    const res = await axios.post<Note>(
      "${import.meta.env.VITE_BACKEND_URL}/notes",
      { content },
      { withCredentials: true }
    );
    setNotes([...notes, res.data]);
    setContent("");
  };

  const deleteNote = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/notes/${id}`, {
      withCredentials: true,
    });
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {" "}
          <img src="/icon.svg" alt="logo" className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-blue-500 text-sm underline"
        >
          Sign Out
        </button>
      </header>

      {/* User Card */}
      {user && (
        <div className="w-full max-w-md mt-10 bg-white  items-center rounded-lg shadow-md p-4 mb-6 text-center">
          <h2 className="text-2xl font-bold mb-1">
            Welcome, {user.name || "User"}!
          </h2>
          <p className="text-gray-600 text-sm">Email: {user.email}</p>
        </div>
      )}

      {/* Create Note */}
      <div className="w-full flex-col max-w-md gap-2 mb-6">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note"
          className="w-full p-3 border bg-white border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={createNote}
          className="bg-blue-500 w-full mt-4 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Note
        </button>
      </div>

      {/* Notes List */}
      <div className="w-full max-w-md space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
          >
            <span className="text-gray-700">{note.content}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-600"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
