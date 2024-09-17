import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { lineChartOptionsDashboard } from './chartOptions'; // Tệp cấu hình biểu đồ
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { BASE_URL_API } from 'constants';
import format from "date-fns/format";
// Đăng ký các component cần thiết cho Chart.js
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const RealTimeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: 'Temperature (°C)', data: [], borderColor: '#0075FF', backgroundColor: 'rgba(0, 117, 255, 0.3)', fill: true, tension: 0.4 },
      { label: 'Humidity (%)', data: [], borderColor: '#00FF7F', backgroundColor: 'rgba(0, 255, 127, 0.3)', fill: true, tension: 0.4 },
      { label: 'Light (Lux)', data: [], borderColor: '#2CD9FF', backgroundColor: 'rgba(44, 217, 255, 0.3)', fill: true, tension: 0.4 },
    ],
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_API}/api/sensor/data?page=1&limit=20&sortKey=updatedAt&order=desc`); // Thay bằng endpoint API thực tế của bạn
      let data = response.data.data;
      console.log('API response data:', data);
      // Lấy danh sách các thời gian từ `updatedAt` làm labels
      data = data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      console.log('Sorted data:', data);

      const labels = data.map(item => format(new Date(item.updatedAt), 'HH:mm'));
      
      // Lấy dữ liệu cho từng loại cảm biến
      const temperatureData = data.map(item => item.temperature);
      const humidityData = data.map(item => item.humidity);
      const lightData = data.map(item => item.light);

      // Cập nhật state cho dữ liệu biểu đồ
      setChartData({
        labels,
        datasets: [
          { ...chartData.datasets[0], data: temperatureData }, // Cập nhật dữ liệu nhiệt độ
          { ...chartData.datasets[1], data: humidityData },     // Cập nhật dữ liệu độ ẩm
          { ...chartData.datasets[2], data: lightData },        // Cập nhật dữ liệu ánh sáng
        ],
      });
      console.log('Updated chartData:', { labels, temperatureData, humidityData, lightData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 180000); // Mỗi 5 giây gọi lại API một lần
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Line data={chartData} options={lineChartOptionsDashboard} />
    </div>
  );
};

export default RealTimeChart;
