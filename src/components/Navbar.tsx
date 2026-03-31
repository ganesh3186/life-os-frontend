import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-md border-b border-white/40 shadow-sm">

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-700">
        {/* {title} */}
      </h1>

      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button className="bg-white/70 hover:bg-indigo-100 border border-indigo-100 px-3 py-2 rounded-lg transition">
          🔔
        </button>

        {/* Profile Avatar */}
        <div className="w-9 h-9 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold">
          G
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}