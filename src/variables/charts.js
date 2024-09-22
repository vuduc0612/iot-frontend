import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSensor } from "views/examples/SensorContext";
import { lineChartOptionsDashboard } from './chartOptions'; // Tệp cấu hình biểu đồ
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);


const RealTimeChart = () => {
  const { chartData } = useSensor();

  return (
    <div>
      <Line data={chartData} options={lineChartOptionsDashboard} />
    </div>
  );
};
export default RealTimeChart;
