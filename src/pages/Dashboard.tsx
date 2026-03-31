import GlassCard from "../components/GlassCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-700">
        Welcome Back 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <GlassCard title="Today's Goals">
          <p className="text-2xl font-bold text-indigo-600">3</p>
          <p className="text-sm text-gray-500">1 remaining</p>
        </GlassCard>

        <GlassCard title="Habit Streak">
          <p className="text-2xl font-bold text-green-600">🔥 7 Days</p>
          <p className="text-sm text-gray-500">Keep it going</p>
        </GlassCard>

        <GlassCard title="Today's Expense">
          <p className="text-2xl font-bold text-red-500">₹500</p>
          <p className="text-sm text-gray-500">Total spent today</p>
        </GlassCard>

        <GlassCard title="Goal Progress">
          <p className="text-2xl font-bold text-blue-600">60%</p>
          <p className="text-sm text-gray-500">UPSC Preparation</p>
        </GlassCard>

      </div>

      {/* Main Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Goals */}
        <GlassCard title="Today's Goals">
          <ul className="space-y-2 text-gray-700">
            <li>✔ Exercise</li>
            <li>✔ Study 2 hours</li>
            <li>⬜ Read book</li>
          </ul>
        </GlassCard>

        {/* Habit Tracker */}
        <GlassCard title="Habit Tracker">
          <p className="text-gray-700">🔥 Current Streak: 7 days</p>
          <p className="text-sm text-gray-500 mt-2">
            Stay consistent with your habits
          </p>
        </GlassCard>

        {/* Expense Summary */}
        <GlassCard title="Expense Summary">
          <p className="text-gray-700">Today: ₹500</p>
          <p className="text-gray-700">This Month: ₹8500</p>
        </GlassCard>

        {/* Routine */}
        <GlassCard title="Routine Tracker">
          <p className="text-gray-700">
            Morning Routine Completed ✅
          </p>
        </GlassCard>

      </div>

      {/* Quick Actions */}
      <GlassCard title="Quick Actions">
        <div className="flex flex-wrap gap-4">

          <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
            Add Expense
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Add Goal
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Track Habit
          </button>

        </div>
      </GlassCard>

    </div>
  );
}