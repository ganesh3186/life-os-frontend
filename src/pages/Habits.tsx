import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Select from "react-select";

interface Habit {
  _id: string;
  title: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

interface OptionType {
  value: string;
  label: string;
}

export default function Habits() {

  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState<OptionType>({
    value: "Health",
    label: "Health",
  });

  const habitCategories: OptionType[] = [
    { value: "Health", label: "Health" },
    { value: "Learning", label: "Learning" },
    { value: "Productivity", label: "Productivity" },
    { value: "Mindfulness", label: "Mindfulness" },
    { value: "Finance", label: "Finance" },
  ];

  /* ---------------- GET HABITS ---------------- */

  const getHabits = async () => {
    try {
      const res = await api.get("/habits");
      setHabits(res.data.data);
    } catch (error) {
      toast.error("Failed to load habits");
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  /* ---------------- ADD HABIT ---------------- */

  const addHabit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.warning("Habit title required");
      return;
    }

    try {
      await api.post("/habits", {
        title,
        category: category.value,
      });

      toast.success("Habit added");

      setTitle("");
      setCategory({ value: "Health", label: "Health" });

      getHabits();
    } catch (error) {
      toast.error("Failed to add habit");
    }
  };

  /* ---------------- TOGGLE HABIT ---------------- */

  const toggleHabit = async (habit: Habit) => {
    try {

      await api.put(`/habits/${habit._id}`, {
        completed: !habit.completed,
      });

      setHabits(
        habits.map((h) =>
          h._id === habit._id ? { ...h, completed: !h.completed } : h
        )
      );

    } catch (error) {
      toast.error("Failed to update habit");
    }
  };

  /* ---------------- DELETE HABIT ---------------- */

  const deleteHabit = async (id: string) => {
    try {
      await api.delete(`/habits/${id}`);

      setHabits(habits.filter((h) => h._id !== id));

      toast.success("Habit deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <h2 className="text-2xl font-bold">Habit Tracker</h2>

      {/* Add Habit */}

      <form
        onSubmit={addHabit}
        className="bg-white shadow-md p-6 rounded-xl grid md:grid-cols-3 gap-4"
      >

        <input
          type="text"
          placeholder="Habit name"
          className="border p-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Select
          options={habitCategories}
          value={category}
          onChange={(option) => setCategory(option as OptionType)}
        />

        <button className="bg-indigo-500 text-white rounded">
          Add Habit
        </button>

      </form>

      {/* Habit List */}

      <div className="bg-white shadow rounded-xl">

        {habits.length === 0 && (
          <p className="p-6 text-gray-500">No habits added</p>
        )}

        <ul>

          {habits.map((habit) => (

            <li
              key={habit._id}
              className="flex items-center justify-between border-b p-4"
            >

              <div className="flex items-center gap-4">

                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit)}
                />

                <div>

                  <p
                    className={`font-medium ${
                      habit.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {habit.title}
                  </p>

                  <span className="text-xs text-indigo-500">
                    {habit.category}
                  </span>

                </div>

              </div>

              <button
                onClick={() => deleteHabit(habit._id)}
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