import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Select from "react-select";

interface Goal {
  _id: string;
  title: string;
  description: string;
  category: string;
  completedDates: string[];
  createdAt: string;
}

interface OptionType {
  value: string;
  label: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState<OptionType>({
    value: "Learning",
    label: "Learning",
  });

  const [filterCategory, setFilterCategory] = useState<OptionType>({
    value: "All",
    label: "All",
  });

  /* ---------------- CATEGORY OPTIONS ---------------- */

  const categoryOptions: OptionType[] = [
    { value: "All", label: "All" },
    { value: "Learning", label: "Learning" },
    { value: "Gym", label: "Gym" },
    { value: "Work", label: "Work" },
    { value: "Reading", label: "Reading" },
    { value: "Finance", label: "Finance" },
    { value: "Personal", label: "Personal" },
  ];

  const goalCategoryOptions = categoryOptions.filter(
    (c) => c.value !== "All"
  );

  /* ---------------- HELPERS ---------------- */

  const isCompletedToday = (goal: Goal) => {
    const today = new Date().toDateString();

    return goal.completedDates?.some(
      (d) => new Date(d).toDateString() === today
    );
  };

  const getStreak = (dates: string[]) => {
    const sorted = [...dates]
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);

    for (let date of sorted) {
      date.setHours(0, 0, 0, 0);

      if (date.getTime() === current.getTime()) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  /* ---------------- API ---------------- */

  const getGoals = async () => {
    try {
      setLoading(true);
      const res = await api.get("/goals");
      setGoals(res.data.data);
    } catch {
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGoals();
  }, []);

  const addGoal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.warning("Goal title required");
      return;
    }

    try {
      await api.post("/goals", {
        title,
        description,
        category: category.value,
      });

      toast.success("Goal added");

      setTitle("");
      setDescription("");
      setCategory({ value: "Learning", label: "Learning" });

      getGoals();
    } catch {
      toast.error("Failed to add goal");
    }
  };

  const toggleGoal = async (goal: Goal) => {
    try {
      await api.put(`/goals/${goal._id}/toggle`);
      getGoals(); // always sync
    } catch {
      toast.error("Failed to update goal");
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter((g) => g._id !== id));
      toast.success("Goal deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- FILTER ---------------- */

  const filteredGoals =
    filterCategory.value === "All"
      ? goals
      : goals.filter((g) => g.category === filterCategory.value);

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Goals</h2>

        <div className="w-56">
          <Select
            options={categoryOptions}
            value={filterCategory}
            onChange={(option) =>
              setFilterCategory(option as OptionType)
            }
          />
        </div>
      </div>

      {/* Add Goal */}
      <form
        onSubmit={addGoal}
        className="bg-white shadow-md p-6 rounded-xl grid md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="Goal title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Select
          options={goalCategoryOptions}
          value={category}
          onChange={(option) => setCategory(option as OptionType)}
        />

        <button className="bg-indigo-600 text-white rounded px-4">
          Add Goal
        </button>
      </form>

      {/* Goals List */}
      <div className="bg-white shadow rounded-xl">
        {loading && <p className="p-4">Loading...</p>}

        {!loading && filteredGoals.length === 0 && (
          <p className="p-6 text-gray-500">No goals found</p>
        )}

        <ul>
          {filteredGoals.map((goal) => (
            <li
              key={goal._id}
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={isCompletedToday(goal)}
                  onChange={() => toggleGoal(goal)}
                />

                <div>
                  <p
                    className={`font-medium ${
                      isCompletedToday(goal)
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {goal.title}
                  </p>

                  {goal.description && (
                    <p className="text-sm text-gray-500">
                      {goal.description}
                    </p>
                  )}

                  <span className="text-xs text-indigo-500">
                    {goal.category}
                  </span>

                  {/* 🔥 Streak */}
                  <p className="text-xs text-green-600">
                    🔥 {getStreak(goal.completedDates)} day streak
                  </p>
                </div>
              </div>

              <button
                onClick={() => deleteGoal(goal._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}