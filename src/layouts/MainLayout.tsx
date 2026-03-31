import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-indigo-100 to-indigo-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
}