import { View, Text, Image } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <Image
      className="w-[100px] h-[100px]"
      source={require("../assets/loading.gif")}
    />
  );
};

export default Loading;
