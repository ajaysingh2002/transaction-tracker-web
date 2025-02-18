import React from "react";

const MostExpensiveTransactions = ({ transactions }) => {
  const sortedTransactions = [...transactions]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="p-4 bg-black">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">
        Most Expensive Transactions
      </h2>
      <ul className="list-disc list-inside">
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id} className="text-white">
            {transaction.description}: ${transaction.amount} on{" "}
            {new Date(transaction.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostExpensiveTransactions;
