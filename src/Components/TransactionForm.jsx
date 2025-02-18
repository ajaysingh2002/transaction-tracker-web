import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionForm = ({
  fetchTransactions,
  editingTransaction,
  setEditingTransaction,
}) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setDate(editingTransaction.date);
      setDescription(editingTransaction.description);
      setCategory(editingTransaction.category);
    }
  }, [editingTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !date || !description || !category) {
      alert("Please fill out all fields");
      return;
    }

    const newTransaction = { amount, date, description, category };

    try {
      if (editingTransaction) {
        await axios.put(
          `http://localhost:5000/api/transactions/${editingTransaction.id}`,
          newTransaction
        );
        setEditingTransaction(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/transactions",
          newTransaction
        );
      }
      fetchTransactions();
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4 p-4 bg-red-500"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="input"
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="input"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="input"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="input"
      />
      <button type="submit" className="btn-primary">
        {editingTransaction ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
