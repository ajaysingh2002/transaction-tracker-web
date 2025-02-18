import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ExpenseChart = ({ transactions }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const monthlyExpenses = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "short",
      });
      if (!acc[month]) acc[month] = 0;
      acc[month] += parseFloat(transaction.amount);
      return acc;
    }, {});

    const chartData = Object.keys(monthlyExpenses).map((month) => ({
      name: month,
      expenses: monthlyExpenses[month],
    }));

    setData(chartData);
  }, [transactions]);

  return (
    <div className="p-4 bg-black">
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
        <Legend />
        <Bar dataKey="expenses" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ExpenseChart;
