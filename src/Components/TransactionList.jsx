import React from "react";
import axios from "axios";

const TransactionList = ({
  transactions,
  fetchTransactions,
  setEditingTransaction,
}) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchTransactions();
  };

  return (
    <div className="transaction-list p-4 bg-black">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">
        Transactions
      </h2>
      <table className="min-w-full bg-gray-800 border border-gray-200 text-white">
        <thead>
          <tr className="bg-gray-700 border-b">
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="py-2 px-4">{transaction.amount}</td>
              <td className="py-2 px-4">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">{transaction.description}</td>
              <td className="py-2 px-4">{transaction.category}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => setEditingTransaction(transaction)}
                  className="btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
