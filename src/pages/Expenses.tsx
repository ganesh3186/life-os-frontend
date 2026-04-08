import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Select from "react-select";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

interface OptionType {
  value: string;
  label: string;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [filterCategory, setFilterCategory] = useState<OptionType>({
    value: "All",
    label: "All",
  });

  /* ---------------- CATEGORY OPTIONS ---------------- */

  const categoryOptions: OptionType[] = [
    { value: "All", label: "All" },
    { value: "Food", label: "Food" },
    { value: "Travel", label: "Travel" },
    { value: "Shopping", label: "Shopping" },
    { value: "Bills", label: "Bills" },
    { value: "Entertainment", label: "Entertainment" },
  ];

  const goalCategoryOptions = categoryOptions.filter((c) => c.value !== "All");

  /* ---------------- GET EXPENSES ---------------- */

  const getExpenses = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data.data);
    } catch {
      toast.error("Failed to load expenses");
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  /* ---------------- ADD EXPENSE ---------------- */

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await api.post("/expenses", {
        title,
        amount: Number(amount),
        category, // string
      });

      toast.success("Expense added");

      setTitle("");
      setAmount("");
      setCategory("Food");

      getExpenses();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  /* ---------------- DELETE EXPENSE ---------------- */

  const deleteExpense = async (id: string) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      toast.success("Expense deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- FILTER EXPENSES ---------------- */

  const filteredExpenses =
    filterCategory.value === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory.value);

  /* ---------------- TOTAL EXPENSE ---------------- */

  const totalExpense = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Expense Tracker</h2>

        <div className="flex items-center gap-4">
          {/* Total Expense */}
          <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
            Total : ₹{totalExpense}
          </div>

          {/* Category Filter */}
          <div className="w-60">
            <Select<OptionType>
              options={categoryOptions}
              value={filterCategory}
              onChange={(option) => setFilterCategory(option!)}
              placeholder="Filter Category"
            />
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <form
        onSubmit={addExpense}
        className="bg-white shadow-md p-4 rounded-xl grid md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Category Select */}
        <Select<OptionType>
          options={goalCategoryOptions}
          value={goalCategoryOptions.find((c) => c.value === category)}
          onChange={(option) => setCategory(option?.value || "")}
          placeholder="Select Category"
        />

        <button className="bg-indigo-500 text-white rounded px-4">
          Add Expense
        </button>
      </form>

      {/* Expense Table */}
      <div className="bg-white shadow rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((e) => (
              <tr key={e._id} className="border-t">
                <td className="p-3">{e.title}</td>
                <td className="p-3">{e.category}</td>
                <td className="p-3 text-red-500 font-medium">₹{e.amount}</td>
                <td className="p-3">
                  {new Date(e.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteExpense(e._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredExpenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-5 text-gray-400">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
