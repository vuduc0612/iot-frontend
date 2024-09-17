// useRandomData.js
import { useState, useEffect } from 'react';

function generateRandomTemperature() {
  return Math.floor(Math.random() * 10 + 25); // Tạo số ngẫu nhiên từ 0 đến 35
}

function generateRandomLight() {
  return Math.floor(Math.random() * 2001); // Tạo số ngẫu nhiên từ 0 đến 2000 Lux
}

function generateRandomHumidity() {
  return Math.floor(Math.random() * 101); // Tạo số ngẫu nhiên từ 0 đến 100%
}

export default function useRandomData(interval = 5000) {
  const [dataTemperature, setDataTemperature] = useState(generateRandomTemperature());
  const [dataLight, setDataLight] = useState(generateRandomLight());
  const [dataHumidity, setDataHumidity] = useState(generateRandomHumidity());

  useEffect(() => {
    const timer = setInterval(() => {
      setDataTemperature(generateRandomTemperature());
      setDataLight(generateRandomLight());
      setDataHumidity(generateRandomHumidity());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { dataTemperature, dataLight, dataHumidity };
}
