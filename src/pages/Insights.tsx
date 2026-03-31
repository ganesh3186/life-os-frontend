import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import api from "../api/axios";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const Insights = () => {
  const [data, setData] = useState<any>(null);
  const [type, setType] = useState("monthly");

  const fetchInsights = async () => {
    try {
      const res = await api.get(`/insights?type=${type}`);
      setData(res.data.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [type]);

  if (!data) return <div className="p-6">Loading insights...</div>;

  /* ---------- Transform Data ---------- */

  const categoryData = Object.keys(data.categoryStats || {}).map((key) => ({
    name: key,
    value: data.categoryStats[key],
  }));

  const dailyData = (data.dailyStats || []).map((d: any) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
  }));

  return (
    <div className="p-6 space-y-8">
      {/* 🔥 Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Insights Dashboard</h2>

        <div className="flex gap-2">
          {["weekly", "monthly", "overall"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-lg text-sm ${
                type === t
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Completion Rate" value={`${data.completionRate}%`} />
        <StatCard title="Best Streak" value={data.bestStreak} />
        <StatCard title="Current Streak" value={data.currentStreak} />
        <StatCard title="Active Days" value={data.activeDays} />
      </div>

      {/* 🔥 Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Activity */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Daily Activity</h3>

          {dailyData.length === 0 ? (
            <p className="text-gray-400">No activity data</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category Chart */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Category Distribution</h3>

          {categoryData.length === 0 ? (
            <p className="text-gray-400">No category data</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 🔥 Top Goal */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">Top Goal</h3>

        {data.topGoal?.title ? (
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{data.topGoal.title}</p>
            <span className="text-indigo-600 font-semibold">
              {data.topGoal.count} times
            </span>
          </div>
        ) : (
          <p className="text-gray-400">No top goal data</p>
        )}
      </div>
    </div>
  );
};

/* ---------- Reusable Card ---------- */

const StatCard = ({ title, value }: any) => (
  <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-xl font-bold mt-1">{value}</h3>
  </div>
);

export default Insights;
