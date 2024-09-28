
import { BASE_URL_API } from 'constants';
import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import format from 'date-fns/format';
import { set } from 'date-fns';

const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [temperature, setTemperature] = useState(null);
  const [light, setLight] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windy, setWindy] = useState(null);
  const [stled1, setStled1] = useState(null);
  const [stled2, setStled2] = useState(null);
  const [stled3, setStled3] = useState(null);
  const celsiusToKelvin = (celsius) => {
    return celsius + 273.15;
  };
  // Dữ liệu biểu đồ
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: 'Temperature (°C)', data: [], borderColor: '#ff7979', backgroundColor: 'rgba(255, 121, 121, 0.4)', fill: true, tension: 0.4 },
      { label: 'Humidity (%)', data: [], borderColor: '#00FF7F', backgroundColor: 'rgba(0, 255, 127, 0.3)', fill: true, tension: 0.4 },
      { label: 'Light (Lux)', data: [], borderColor: '#2CD9FF', backgroundColor: 'rgba(44, 217, 255, 0.3)', fill: true, tension: 0.4 },
    ],
  });

  useEffect(() => {
    const socket = io(BASE_URL_API);
    socket.on('sensorData', (data) => {
      //console.log(data)
      const { temperature, light, humidity, windy, stled1, stled2, stled3 } = JSON.parse(data);
      const currentTime = format(new Date(), 'HH:mm:ss');
      
      setTemperature(Math.round(temperature));
      setLight(Math.round(light));
      setHumidity(Math.round(humidity));
      setWindy(Math.round(windy));
      setStled1(stled1);
      setStled2(stled2);
      setStled3(stled3);

      // Cập nhật dữ liệu biểu đồ
      setChartData(prevData => {
        const newLabels = [...prevData.labels, currentTime].slice(-15); 
        const newTemperatureData = [...prevData.datasets[0].data, Math.round(temperature)].slice(-15);
        const newHumidityData = [...prevData.datasets[1].data, Math.round(humidity)].slice(-15);
        const newLightData = [...prevData.datasets[2].data, Math.round(light)].slice(-15);

        return {
          labels: newLabels,
          datasets: [
            { ...prevData.datasets[0], data: newTemperatureData },
            { ...prevData.datasets[1], data: newHumidityData },
            { ...prevData.datasets[2], data: newLightData },
          ],
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SensorContext.Provider value={{ temperature, light, humidity, windy, stled1, stled2, stled3, chartData }}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensor = () => React.useContext(SensorContext);
