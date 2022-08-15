import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
  
  
  
  export default function Home({d}) {
      console.log(d);
    return (
      <ResponsiveContainer margin= "0 auto" width="95%" height={400}>
        <AreaChart data={d}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
  
          <Area dataKey="highest" stroke="#2451B7" fill="url(#color)" />
  
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickCount={50}
            />
  
          <YAxis
            datakey="highest"
            axisLine={false}
            tickLine={false}
            tickCount={40}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
  
  <Tooltip content={<CustomTooltip />} />
  
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label} {payload[0].payload.time}</p>
          <p className="label">Value : {payload[0].payload.value}</p>
          <p className="label">Highest price: {payload[0].payload.highest} </p>
          <p className="label">Lowest price: {payload[0].payload.lowest} </p>
          <p className="label">Opening price: {payload[0].payload.open}</p>
          <p className="label">Closing price: {payload[0].payload.closed}</p>
        </div>
      );
    }
  
    return null;
  };