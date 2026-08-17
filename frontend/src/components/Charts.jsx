import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function Charts({ data }) {

  const chartData = [
    { name: "Cars", value: data.car },
    { name: "Bikes", value: data.motorcycle },
    { name: "Buses", value: data.bus },
    { name: "Trucks", value: data.truck }
  ];

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444"
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "40px"
      }}
    >

      <div>

        <h2>Vehicle Distribution</h2>

        <PieChart width={350} height={300}>

          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={100}
          >

            {
              chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))
            }

          </Pie>

          <Tooltip />

        </PieChart>

      </div>

      <div>

        <h2>Vehicle Count</h2>

        <BarChart
          width={400}
          height={300}
          data={chartData}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#3b82f6"
          />

        </BarChart>

      </div>

    </div>
  );
}

export default Charts;