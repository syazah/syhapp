import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import * as Animatable from "react-native-animatable";
import url from "../data/url.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContextProvider.jsx";

const SignIn = () => {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleFormDataChange(id, value) {
    if (id === "username") {
      setFormData({ ...formData, [id]: value.toLowerCase() });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  }

  async function handleSubmitForm() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setLoading(false);
        await AsyncStorage.setItem("token", data.token);
        setUser(data.userData);
        return router.replace("/quiz");
      } else {
        Alert.alert(JSON.stringify(data.message));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(JSON.stringify(error));
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        {/* HEADER TEXT  */}
        <View style={{ width: width, height: height }} className="py-2">
          {/* TEXT VIEWS  */}
          <View className="w-full justify-start items-start">
            <Animatable.Text
              animation={"slideInLeft"}
              className="font-obold text-secondary text-[90px]"
            >
              Sign In
            </Animatable.Text>
          </View>

          {/* FORM  */}
          <Animatable.View
            animation={"slideInUp"}
            className="bg-secondary h-full rounded-t-xl py-8 px-4"
          >
            {/* username  */}
            <View className="w-full px-2 mt-2">
              <Text className="text-lg font-omedium text-primary">
                Username
              </Text>
              <View className="w-full border-2 p-1 focus:p-2 transition-all duration-500 border-primary rounded-lg justify-start items-center flex-row">
                <Feather name="at-sign" size={24} color="#eee" />
                <TextInput
                  value={formData.username}
                  onChangeText={(value) =>
                    handleFormDataChange("username", value)
                  }
                  className="ml-1 text-lg font-omedium  text-primary w-full"
                />
              </View>
            </View>
            {/* password  */}
            <View className="w-full px-2 mt-2">
              <Text className="text-lg font-omedium text-primary">
                Password
              </Text>
              <View className="w-full border-2 p-1 focus:p-2 transition-all duration-500 border-primary rounded-lg justify-start items-center flex-row">
                <MaterialIcons name="password" size={24} color="#eee" />
                <TextInput
                  value={formData.password}
                  onChangeText={(value) =>
                    handleFormDataChange("password", value)
                  }
                  className="ml-1 text-lg font-omedium  text-primary w-full"
                  secureTextEntry
                />
              </View>
            </View>

            {/* SIGN UP BUTTON  */}
            <View className="w-full justify-center items-center">
              <TouchableOpacity
                onPress={handleSubmitForm}
                activeOpacity={0.8}
                className="w-1/2 bg-tertiary p-2 mt-8 rounded-lg justify-center items-center"
              >
                <Text className="text-3xl text-primary font-obold">
                  {loading ? "Loading ... " : "Sign In"}
                </Text>
              </TouchableOpacity>
              <Text className="font-omedium justify-center items-center flex-row mt-4 text-base text-gray-300">
                Don't Have An Account ?{" "}
                <Link
                  className="font-obold text-tertiary underline"
                  href={"/signup"}
                >
                  Sign Up
                </Link>
              </Text>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
