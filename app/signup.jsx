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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import * as Animatable from "react-native-animatable";
import url from "../data/url.js";

const SignUp = () => {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [otpGot, setOtpGot] = useState({
    _id: "",
    otp: 0,
    status: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: 0,
    password: "",
  });

  // FORM DATA CHANGE
  function handleFormDataChange(id, value) {
    if (id === "username") {
      setFormData({ ...formData, [id]: value.toLowerCase() });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  }

  // SUBMIT FORM DATA
  async function handleSubmitForm() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setOtpGot({ _id: data._id, status: 1 });
      }
      if (data.success === false) {
        Alert.alert("Error", JSON.stringify(data.message));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", JSON.stringify(error));
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otpGot),
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setLoading(false);
        return router.replace("/signin");
      } else {
        Alert.alert(JSON.stringify(data.message));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
              Register
            </Animatable.Text>
            <View
              width={{ width: width }}
              className="w-full flex-row justify-start items-start"
            >
              <Animatable.Text
                animation={"slideInLeft"}
                className="font-obold text-secondary text-8xl -mt-8"
              >
                now
              </Animatable.Text>
            </View>
          </View>

          {/* FORM  */}
          <Animatable.View
            animation={"slideInUp"}
            className="bg-secondary h-full rounded-t-xl py-8 px-4"
          >
            {/* name  */}
            <View className="w-full px-2">
              <Text className="text-lg font-omedium text-primary">Name</Text>
              <View className="w-full border-2 p-1 focus:p-2 transition-all duration-500 border-primary rounded-lg justify-start items-center flex-row">
                <AntDesign name="user" size={24} color="#eee" />
                <TextInput
                  editable={otpGot.status === 0}
                  value={formData.name}
                  onChangeText={(value) => handleFormDataChange("name", value)}
                  className="ml-1 text-lg font-omedium  text-primary w-full"
                />
              </View>
            </View>
            {/* username  */}
            <View className="w-full px-2 mt-2">
              <Text className="text-lg font-omedium text-primary">
                Username
              </Text>
              <View className="w-full border-2 p-1 focus:p-2 transition-all duration-500 border-primary rounded-lg justify-start items-center flex-row">
                <Feather name="at-sign" size={24} color="#eee" />
                <TextInput
                  editable={otpGot.status === 0}
                  value={formData.username}
                  onChangeText={(value) =>
                    handleFormDataChange("username", value)
                  }
                  className="ml-1 text-lg font-omedium  text-primary w-full"
                />
              </View>
            </View>
            {/* email  */}
            <View className="w-full px-2 mt-2">
              <Text className="text-lg font-omedium text-primary">
                Phone No
              </Text>
              <View className="w-full border-2 p-1 focus:p-2 transition-all duration-500 border-primary rounded-lg justify-start items-center flex-row">
                <Fontisto name="email" size={24} color="#eee" />
                <TextInput
                  value={formData.phone}
                  editable={otpGot.status === 0}
                  placeholder="+91"
                  placeholderTextColor={"#ccc"}
                  onChangeText={(value) => handleFormDataChange("phone", value)}
                  className="ml-1 text-lg font-omedium  text-primary w-full"
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
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
                  editable={otpGot.status === 0}
                  value={formData.password}
                  onChangeText={(value) =>
                    handleFormDataChange("password", value)
                  }
                  className="ml-1 text-lg font-omedium  text-primary w-full"
                  secureTextEntry
                />
              </View>
            </View>

            {otpGot.status === 1 && (
              <Animatable.View
                animation={"fadeIn"}
                className="w-full px-2 mt-2"
              >
                <Text className="text-lg font-omedium text-primary">OTP</Text>
                <View className="w-full border-2 p-1 focus:p-2 transition-all duration-500 border-primary rounded-lg justify-start items-center flex-row">
                  <MaterialIcons name="password" size={24} color="#eee" />
                  <TextInput
                    onChangeText={(value) =>
                      setOtpGot({ ...otpGot, otp: value })
                    }
                    placeholderTextColor={"#ccc"}
                    placeholder="enter otp sent on your number"
                    className="ml-1 text-lg font-omedium  text-primary w-full"
                    secureTextEntry
                    textContentType="creditCardNumber"
                    keyboardType="number-pad"
                  />
                </View>
              </Animatable.View>
            )}

            {/* SIGN UP BUTTON  */}
            <View className="w-full justify-center items-center">
              <TouchableOpacity
                onPress={
                  otpGot.status === 0 ? handleSubmitForm : handleVerifyOtp
                }
                activeOpacity={0.8}
                className="w-1/2 bg-tertiary p-2 mt-8 rounded-lg justify-center items-center"
              >
                <Text className="text-3xl text-primary font-obold">
                  {loading ? "Loading ... " : "Sign Up"}
                </Text>
              </TouchableOpacity>
              <Text className="font-omedium justify-center items-center flex-row mt-4 text-base text-gray-300">
                Already Have An Account ?{" "}
                <Link
                  className="font-obold text-tertiary underline"
                  href={"/signin"}
                >
                  Log In
                </Link>
              </Text>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
