
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CertificatesBarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const CertificatesBarChart = ({ data }: CertificatesBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12 }} 
          tickCount={5} 
        />
        <Tooltip 
          cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
          formatter={(value) => [`${value} certificates`, ""]}
        />
        <Bar 
          dataKey="value" 
          fill="rgba(139, 92, 246, 0.85)" 
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CertificatesBarChart;
