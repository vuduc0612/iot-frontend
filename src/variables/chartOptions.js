
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

// chart options
export const lineChartOptionsDashboard = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  colors: ["#0075FF", "#2CD9FF"],
  elements: {
    line: {
      borderWidth: 1,  // Đặt độ dày mặc định cho tất cả các đường
      tension: 0.4       // Đặt độ cong mặc định cho tất cả các đường
    },
    point: {
      radius: 1.5,         // Kích thước mặc định cho tất cả các điểm
      hoverRadius: 2     // Kích thước khi hover
    }
  },
  plugins: {
    legend: {
      labels: {
        boxWidth: 30,    // Giảm chiều rộng của box trong legend
        boxHeight: 10,   // Giảm chiều cao của box trong legend
        padding: 10 ,
        font: {
          size: 13        // Giảm kích thước chữ của legend
        },
        color: '#ffffff'
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false   // Ẩn đường lưới trục x nếu muốn
      },
      ticks: {
        font: {
          size: 12        // Giảm kích thước chữ của nhãn trục x
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 0.5,
        display: false
      },
      ticks: {
        font: {
          size: 12
        },
        stepSize: 70 // Khoảng cách giữa các bậc đơn vị trên trục y
      }
    }
  },
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
};

