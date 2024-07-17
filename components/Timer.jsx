import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
const Timer = ({ startTime }) => {
  const navigate = useNavigation();
  const [time, setTime] = useState(startTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    setTime(startTime);
  }, [startTime]);
  useEffect(() => {
    if (time === 0) {
      navigate.goBack();
    }
  }, [time, navigate]);
  return (
    <View className="w-[50px] h-[50px] bg-secondary-200 rounded-full justify-center items-center">
      <Text className="font-osemibold text-3xl text-secondary">{time}</Text>
    </View>
  );
};

export default Timer;
