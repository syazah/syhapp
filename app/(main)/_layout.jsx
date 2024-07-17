import { BackHandler, Alert } from "react-native";
import React, { useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const MainLayout = () => {
  const pathname = usePathname();
  useEffect(() => {
    const onBackPress = () => {
      if (
        pathname === "/quiz" ||
        pathname === "/profile" ||
        pathname === "/search" ||
        pathname === "/leaderboard"
      ) {
        Alert.alert(
          "Exit App",
          "Are you sure you want to leave the app?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Exit", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true;
      }
      return false;
    };

    // Add the event listener
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    // Clean up the event listener on component unmount or when pathname changes
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [pathname]);
  const zoomIn = {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 1.2,
    },
    1: {
      scale: 1,
    },
  };
  const TabIcon = ({ icon, color, focus }) => {
    return (
      <Animatable.View
        animation={focus ? zoomIn : ""}
        duration={1000}
        easing={"ease-out-back"}
        className="items-center justify-center gap-2"
      >
        {icon}
      </Animatable.View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#48466D",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#eee",
          borderTopWidth: 2,
          borderTopColor: "#ccc",
          height: 70,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="quiz"
        options={{
          headerShown: false,
          title: "QUIZ",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <MaterialIcons
                  name="quiz"
                  size={focused ? 36 : 32}
                  color={color}
                />
              }
              color={color}
              focus={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <Ionicons
                  name="search-circle"
                  size={focused ? 44 : 40}
                  color={color}
                />
              }
              color={color}
              focus={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          headerShown: false,
          title: "Leaderboard",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <MaterialIcons
                  name="leaderboard"
                  size={focused ? 36 : 32}
                  color={color}
                />
              }
              color={color}
              focus={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <FontAwesome
                  name="user-circle"
                  size={focused ? 36 : 32}
                  color={color}
                />
              }
              color={color}
              focus={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
