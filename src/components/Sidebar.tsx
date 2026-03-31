import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/70 backdrop-blur-lg border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold text-indigo-600 p-6">Life OS</div>

      <nav className="flex flex-col gap-2 px-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/goals"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          🎯 Daily Goals
        </NavLink>

        <NavLink
          to="/habits"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          🔁 Habit Tracker
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          💰 Expenses
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          📈 Monthly Insights
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          🕒 Logs
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
        >
          👤 Profile
        </NavLink>
      </nav>
    </aside>
  );
}
