import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DailyExpenseChart = ({ transactions }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dailyExpenses = transactions.reduce((acc, transaction) => {
      const day = new Date(transaction.date).toLocaleDateString();
      if (!acc[day]) acc[day] = 0;
      acc[day] += parseFloat(transaction.amount);
      return acc;
    }, {});

    const chartData = Object.keys(dailyExpenses).map((day) => ({
      name: day,
      expenses: dailyExpenses[day],
    }));

    setData(chartData);
  }, [transactions]);

  return (
    <div className="p-4 bg-black">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">
        Daily Expenses
      </h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
        <Legend />
        <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default DailyExpenseChart;
