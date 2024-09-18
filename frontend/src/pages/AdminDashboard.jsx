import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function AdminDashboard() {
  const data = [
    { name: "Empty Beds", value: 70 },
    { name: "Occupied Beds", value: 30 },
  ];

  const colors = ["#28a745", "#ffc107"];

  return (
    <div className="container mx-auto px-4">
      <div className="rounded-lg shadow-lg p-8 mt-4 text-black bg-slate-200">
        <h1 className="text-4xl font-bold text-center">ABC Hostel</h1>
        <p className="text-gray-700 text-sm text-center mt-4">
          123 Example Street, City, Country
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <div
          className="pie-chart-container"
          style={{ width: "50%", float: "left", position: "relative" }}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              startAngle={90}
              endAngle={450}
              innerRadius={0}
              outerRadius={160}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <div
            className="text-lg"
            style={{
              position: "absolute",
              top: "50%",
              right: "-150px",
              transform: "translateY(-50%)",
            }}
          >
            <p className="mb-3 text-lg">Total Beds: 100</p>
            {data.map((entry, index) => (
              <div key={`label-${index}`} className="flex items-center mb-2">
                <div
                  className="w-4 h-4 mr-2"
                  style={{
                    backgroundColor: colors[index],
                    borderRadius: "50%",
                  }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
