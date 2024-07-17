import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../context/UserContextProvider";
const Profile = () => {
  const { user } = useContext(UserContext);
  // HANDLE SIGNOUT
  function handleSignOut() {
    try {
      Alert.alert(
        "Sign Out",
        "Do you really want to sign out ?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              await AsyncStorage.removeItem("token");
              return router.replace("/signin");
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="relative bg-secondary h-full">
      <View className="w-full h-[10%]"></View>
      <View className="w-full h-[30%] absolute z-[10] justify-center items-center">
        <Animatable.Image
          animation={"slideInDown"}
          style={{ borderWidth: 10, borderColor: "#17153B" }}
          className=" w-[120px] h-[120px] rounded-full shadow-none outline-none"
          source={require("../../assets/avatar/avatar1.png")}
          resizeMode="cover"
        />
      </View>

      {/* MAIN PROFILE  */}
      <View className="w-full h-full bg-primary rounded-t-3xl justify-start items-center">
        <Text className="mt-[18%] text-2xl font-osemibold">{user?.name}</Text>
        <Text className="-mt-2 text-lg text-gray-500 font-oregular">
          @{user?.username}
        </Text>
        <View className="w-full mt-6 justify-center items-center">
          <View className="w-[90%] bg-secondary rounded-2xl p-2 flex flex-row">
            <TouchableOpacity className="w-1/3 justify-center items-center p-2 border-r-2 border-primary">
              <AntDesign name="star" size={24} color={"white"} />
              <Text className="text-[#9a99af] text-sm ">POINTS</Text>
              <Text className="font-obold text-xl text-primary">
                {user?.quizAttempted.length > 0
                  ? Math.ceil(
                      100 *
                        (user?.quizCompleted.length /
                          user?.quizAttempted.length)
                    )
                  : Math.ceil(100 * (user?.quizCompleted.length / 1))}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/3 justify-center items-center p-2 border-r-2 border-primary">
              <MaterialIcons name="verified" size={24} color="white" />
              <Text className="text-[#9a99af] text-sm ">SCORE</Text>
              <Text className="font-obold text-xl text-primary">
                {user?.score}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/3 justify-center items-center ">
              <MaterialIcons name="incomplete-circle" size={24} color="white" />
              <Text className="text-[#9a99af] text-sm ">COMPLETED</Text>
              <Text className="font-obold text-xl text-primary">
                {user?.quizCompleted.length}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-4 px-6 w-full justify-start items-start">
          <Text className="font-osemibold text-lg">Badges</Text>
        </View>
        <View className="w-full justify-start items-start px-6 ">
          {[
            {
              title: "Favorites",
              icons: (
                <MaterialIcons name="favorite" size={24} color={"#2d2d2d"} />
              ),
            },
            {
              title: "Settings",
              icons: <Feather name="settings" size={24} color={"#2d2d2d"} />,
            },
            {
              title: "Feedback & Support",
              icons: (
                <MaterialIcons name="feedback" size={24} color={"#2d2d2d"} />
              ),
            },
          ].map((item, index) => {
            return (
              <ProfileSettings
                key={index}
                title={item.title}
                icons={item.icons}
              />
            );
          })}
        </View>

        <View className="w-full justify-center items-center">
          <TouchableOpacity
            onPress={handleSignOut}
            className="w-[90%] justify-center items-center bg-secondary p-4 rounded-2xl"
          >
            <Text className="text-2xl font-osemibold text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ProfileSettings = ({ title, icons }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title === "Settings") return router.navigate("/profile-settings");
      }}
      activeOpacity={0.5}
      className="py-2 w-full justify-start items-start mb-4 flex-row border-b-2 border-gray-300"
    >
      {icons}
      <Text className="text-base font-omedium ml-2">{title}</Text>
    </TouchableOpacity>
  );
};

export default Profile;
