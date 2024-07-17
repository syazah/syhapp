import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import url from "../../data/url";
import { UserContext } from "../../context/UserContextProvider";
import { Ionicons } from "@expo/vector-icons";
import Image1 from "../../assets/quizzes/1.jpeg";
import Image2 from "../../assets/quizzes/2.jpeg";
import Image3 from "../../assets/quizzes/3.jpeg";
import Image4 from "../../assets/quizzes/4.jpeg";
import Image5 from "../../assets/quizzes/5.jpeg";
import { AntDesign } from "@expo/vector-icons";

import { router } from "expo-router";
import { QuizContext } from "../../context/QuizContextProvider";
import AddFavorite from "../../data/addFavorite";
const images = [Image1, Image2, Image3, Image4, Image5];

const Quiz = () => {
  const [currentTime, setCurrentTime] = useState({});
  const { currentRunningQuiz } = useContext(QuizContext);
  const [quizzes, setQuizzes] = useState({});
  const { user } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);

  // GET ALL QUIZZES
  async function getAllQuizzes() {
    try {
      const res = await fetch(`${url}/api/v1/user/get-all-quiz`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setQuizzes(data.quizzes);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", JSON.stringify(error));
    }
  }
  async function handleRefresh() {
    try {
      setRefreshing(true);
      getAllQuizzes();
      setRefreshing(false);
    } catch (error) {
      Alert.alert("Error", "Something Unexpected Occurred While Refreshing");
    }
  }
  // USE EFFECT FOR TIME
  useEffect(() => {
    const d = new Date();
    const time = d.getHours();
    if (time < 12) {
      setCurrentTime({
        message: "Good Morning",
        icon: <Feather name="sun" size={24} color={"#C8ACD6"} />,
      });
    } else {
      setCurrentTime({
        message: "Good Evening",
        icon: <Feather name="moon" size={24} color="#C8ACD6" />,
      });
    }
    handleRefresh();
  }, []);

  return (
    <SafeAreaView className="bg-secondary h-full">
      {/* HEADER  */}
      <View className="p-2">
        <View className="w-full py-2 px-2  flex flex-row justify-between items-center">
          <View className="w-[80%]">
            <View className="flex flex-row gap-1 items-center">
              {currentTime.icon}
              <Text className="font-omedium text-secondary-200 uppercase">
                {currentTime.message}
              </Text>
            </View>
            <View className="flex flex-row gap-2 items-center -mt-2">
              <Text className="font-obold text-2xl text-primary">
                {user?.name}
              </Text>
            </View>
          </View>
          <View className=" flex flex-row justify-start items-start">
            <Image
              className="w-[64px] h-[64px] rounded-full"
              source={require("../../assets/avatar/avatar1.png")}
            />
          </View>
        </View>
      </View>
      {/* RECENT QUIZ  */}
      {currentRunningQuiz != null && (
        <View className="w-full px-2 pb-1">
          <TouchableOpacity
            onPress={() =>
              router.navigate(`run-quiz/${currentRunningQuiz?.id}`)
            }
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className=" rounded-xl p-2 border-2 border-black"
          >
            <Text className="font-obold text-white text-xl">Recent</Text>
            <Text className=" font-osemibold text-sm text-white leading-tight">
              {currentRunningQuiz?.subtitle}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* QUIZ  */}
      <Animatable.View
        animation={"slideInUp"}
        className="w-full h-full flex-1 bg-primary rounded-t-3xl pb-0 "
      >
        {/* QUIZ HEADER  */}
        <View className="flex-row justify-between p-2 pt-4 border-b-2 border-secondary">
          <Text className="font-osemibold text-black text-xl">Compliances</Text>
          <Text className="font-omedium text-secondary text-lg">See all</Text>
        </View>

        {/* QUIZ CONTAINER FLATLIST  */}
        <FlatList
          data={quizzes}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            const isQuizAttempted = user?.quizCompleted?.includes(item._id);
            const isQuizFavorite = user?.favorites?.includes(item._id);
            return (
              <QuizItems
                index={index}
                item={item}
                isQuizAttempted={isQuizAttempted}
                isQuizFavorite={isQuizFavorite}
              />
            );
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          style={{ flex: 1 }}
        />
      </Animatable.View>
    </SafeAreaView>
  );
};

function QuizItems({ item, index, isQuizAttempted, isQuizFavorite }) {
  const { width } = Dimensions.get("window");
  const { user } = useContext(UserContext);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        router.navigate(`run-quiz/${item._id}`);
      }}
      style={({ width }, isQuizAttempted ? { opacity: 1 } : {})}
      className={
        "h-[70px] mt-1 flex-row p-2 justify-center items-center border-b-[1px] border-gray-200"
      }
    >
      <View className="w-[40px] h-[40px] rounded-full overflow-hidden mr-1">
        <Image
          className={"w-full h-full scale-150"}
          source={images[index % images.length]}
          resizeMode="cover"
        />
      </View>
      <View className={"flex-1 ml-1 relative"}>
        <Text className={"font-oregular text-[10px] text-gray-500"}>
          {item?.title}
        </Text>
        <Text className={"font-oregular text-xs text-black"}>
          {item?.subtitle}
        </Text>
        <Text className={"font-oregular text-[10px] text-gray-500"}>
          {item?.subject}
        </Text>
        {isQuizAttempted && (
          <View className="absolute right-0">
            <Ionicons name="checkmark-done-circle" size={18} color="#48466D" />
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Add To Favorites ?",
              `Do You Want To Add This Quiz To Your Favorites?`,
              [
                { text: "cancel", type: "cancel" },
                {
                  text: "Yes",
                  onPress: async () => {
                    await AddFavorite(item._id, user._id);
                  },
                },
              ]
            );
          }}
          className="absolute bottom-0 right-0"
        >
          {isQuizFavorite ? (
            <AntDesign name="heart" size={20} color="red" />
          ) : (
            <AntDesign name="hearto" size={20} color="#F08080" />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default Quiz;
