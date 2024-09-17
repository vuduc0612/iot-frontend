import { BASE_URL_API } from 'constants';
import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [temperature, setTemperature] = useState(null);
  const [light, setLight] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const socket = io(BASE_URL_API);
    socket.on('sensorData', (data) => {
      const { temperature, light, humidity } = JSON.parse(data);
      setTemperature(Math.round(temperature));
      setLight(Math.round(light));
      setHumidity(Math.round(humidity));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SensorContext.Provider value={{ temperature, light, humidity }}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensor = () => React.useContext(SensorContext);
