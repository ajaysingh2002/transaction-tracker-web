import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CategoryExpenseChart = ({ transactions }) => {
  const [data, setData] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00c49f"];

  useEffect(() => {
    const categoryExpenses = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) acc[transaction.category] = 0;
      acc[transaction.category] += parseFloat(transaction.amount);
      return acc;
    }, {});

    const chartData = Object.keys(categoryExpenses).map((category, index) => ({
      name: category,
      value: categoryExpenses[category],
      fill: COLORS[index % COLORS.length],
    }));

    setData(chartData);
  }, [transactions]);

  return (
    <div className="p-4 bg-black">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">
        Category-wise Expenses
      </h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryExpenseChart;
