import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  BackHandler,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import url from "../../data/url.js";
import { UserContext } from "../../context/UserContextProvider.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuizContext } from "../../context/QuizContextProvider.jsx";
import { Ionicons } from "@expo/vector-icons";
import QuizQuestions from "../../components/QuizQuestions.jsx";
import Timer from "../../components/Timer.jsx";
const RunQuiz = () => {
  const { id } = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [quiz, setQuiz] = useState(null);
  const [progressIndex, setProgressIndex] = useState(1);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { setCurrentRunningQuiz, optionSelected } = useContext(QuizContext);
  const listRef = useRef(null);
  // USE EFFECT FOR GETTING THE QUIZ
  async function getQuiz() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/get-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, user_id: user._id }),
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setQuiz(data.quiz);
        setCurrentRunningQuiz({
          id,
          subtitle: data.quiz.subtitle,
          questionLength: data.quiz.questions.length,
          questions: data.quiz.questions,
        });
      } else {
        Alert.alert("Error", JSON.stringify(data.message));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", JSON.stringify(error));
      setLoading(false);
    }
  }
  useEffect(() => {
    getQuiz();
  }, []);
  return (
    <SafeAreaView className="bg-secondary">
      {/* QUIZ HEADER  */}
      <View className="w-full h-[12%] bg-secondary justify-between p-4 py-0">
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                "Do You Really Want To Go Back ?",
                "All Progress will be lost",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Yes",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
            className="bg-secondary-200 w-[50px] h-[50px] rounded-full justify-center items-center"
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={48}
              color="#17153B"
            />
          </TouchableOpacity>

          {/* Timer  */}
          {quiz?.questions.length > 3 ? (
            <Timer startTime={120} />
          ) : (
            <Timer startTime={60} />
          )}
        </View>
        <View className="flex-row w-full justify-start">
          <Text className="text-2xl text-gray-200 font-osemibold">
            Question {progressIndex}/{quiz?.questions.length}
          </Text>
          <View className="flex flex-row justify-center items-center">
            {quiz?.questions.map((dot, index) => {
              return (
                <View
                  key={index}
                  className={`ml-2 w-[10px] h-[10px] rounded-full bg-secondary-200 p-[8px] justify-center items-center`}
                >
                  {index <= progressIndex - 1 && (
                    <View
                      className={`bg-white h-[10px] w-[10px] rounded-full ${
                        optionSelected[index] != null ? "bg-secondary" : ""
                      }`}
                    ></View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* ACTUAL QUIZ S */}
      <View className="w-full h-full bg-primary rounded-t-2xl">
        {loading ? (
          <View className="w-full h-full flex justify-center items-center">
            <Text className="font-osemibold text-2xl text-gray-400">
              Loading...
            </Text>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={quiz?.questions}
            horizontal
            pagingEnabled={true}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
              return (
                <QuizQuestions
                  questionLength={quiz.questions.length}
                  listRef={listRef}
                  setProgressIndex={setProgressIndex}
                  mainIndex={index}
                  progressIndex={progressIndex}
                  item={item}
                />
              );
            }}
            scrollEnabled={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default RunQuiz;
