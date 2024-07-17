import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import url from "../../data/url";
import { UserContext } from "../../context/UserContextProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import Image1 from "../../assets/quizzes/1.jpeg";
import Image2 from "../../assets/quizzes/2.jpeg";
import Image3 from "../../assets/quizzes/3.jpeg";
import Image4 from "../../assets/quizzes/4.jpeg";
import Image5 from "../../assets/quizzes/5.jpeg";
const images = [Image1, Image2, Image3, Image4, Image5];

const ViewCategory = () => {
  const { categoryChosen } = useContext(UserContext);
  const [quizzes, setQuizzes] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  async function FetchQuizCategory() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/get-category-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryChosen }),
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setQuizzes(data.quizzes);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error");
    }
  }
  useEffect(() => {
    FetchQuizCategory();
  }, []);
  return (
    <SafeAreaView className="bg-secondary flex-1 w-full">
      <View className="h-[10%] p-2 flex-row justify-start items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="w-[50px] h-[50px] bg-secondary-100 rounded-full justify-center items-center
        "
        >
          <AntDesign name="leftcircleo" size={32} color="#17153B" />
        </TouchableOpacity>
        <Text className="font-osemibold text-center text-lg ml-2 text-primary">
          {categoryChosen}
        </Text>
      </View>
      <View className="w-full h-[90%] bg-primary rounded-2xl p-2">
        {loading ? (
          <Loading />
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {quizzes?.map((quiz, index) => {
              return (
                <View
                  key={quiz._id}
                  className="mt-2 w-full h-[70px] border-b-[1px] border-gray-300 flex-row"
                >
                  <View className="w-[15%] justify-center items-center">
                    <Image
                      className="w-[40px] h-[40px] rounded-full"
                      source={images[index % images.length]}
                    />
                  </View>
                  <View className="w-[80%] p-2">
                    <Text className="text-[10px] text-gray-600">
                      {quiz.title}
                    </Text>
                    <Text className="text-[12px] text-gray-800">
                      {quiz.subtitle}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewCategory;
