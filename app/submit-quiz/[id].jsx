import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { QuizContext } from "../../context/QuizContextProvider";
import { UserContext } from "../../context/UserContextProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import url from "../../data/url";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
const Score = () => {
  const { user } = useContext(UserContext);
  const { scoreCalculated, currentRunningQuiz, optionSelected } =
    useContext(QuizContext);
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const navigate = useNavigation();
  const { width } = Dimensions.get("window");

  //HANDLE SHARE
  async function shareContent() {
    try {
      const imageUri = await ref.current.capture();
      await Sharing.shareAsync(imageUri, {
        // message: `Hello, I have recently given a compliance test for ${currentRunningQuiz.subtitle} on Secure Your Hacks Compliance App, And I have received a score of ${scoreCalculated}`,
        dialogTitle: "Share Via",
      });
    } catch (error) {
      Alert.alert("Error");
    }
  }

  // HANDLE SCORE SUBMITTED
  async function handleScoreSubmit() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/handle-score-submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          quizId: id,
          score: scoreCalculated,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setLoading(false);
      } else {
        Alert.alert("ERROR", JSON.stringify(data.message));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", JSON.stringify(error));
      setLoading(false);
    }
  }
  useEffect(() => {
    handleScoreSubmit();
  }, []);

  return (
    <SafeAreaView style={{ width }} className="flex-1 w-full bg-primary">
      <View className="w-full h-full justify-start items-center p-4 py-6 relative">
        {loading ? (
          <Text className="font-osemibold text-xl text-secondary text-center">
            Loading, Don't Move From This Screen
          </Text>
        ) : (
          <>
            <ViewShot ref={ref} className="w-full h-full">
              <Animatable.View
                animation={"fadeIn"}
                className="w-full overflow-hidden bg-secondary rounded-xl py-4"
              >
                <View className="flex justify-center items-center">
                  <View className="w-[200px] h-[200px] justify-center items-center bg-primary rounded-full p-2">
                    <Image
                      className="w-[100px] h-[100px]"
                      source={require("../../assets/trophy.gif")}
                    />
                    <Text className="font-osemibold text-2xl">SCORE</Text>
                    <Text className="font-osemibold text-4xl">
                      {scoreCalculated}
                    </Text>
                  </View>
                  <Text className="font-omedium text-white text-lg mt-4 text-center">{`You get +${scoreCalculated} on your profile`}</Text>
                </View>
              </Animatable.View>

              <Text className="font-osemibold text-3xl mt-4 border-b-2 border-secondary-100 text-secondary-100">
                Analysis
              </Text>
              <View className="flex-row mt-4 justify-between">
                <View>
                  <Text className="font-omedium text-lg">Total Questions</Text>
                  <Text className="font-omedium text-2xl text-secondary-100">
                    {currentRunningQuiz.questionLength}
                  </Text>
                </View>
                <View>
                  <Text className="font-omedium text-lg">Agreements</Text>
                  <Text className="font-omedium text-2xl text-secondary-100">
                    {scoreCalculated / 100}
                  </Text>
                </View>
              </View>
              <View className="flex-row mt-4 justify-start">
                <View>
                  <Text className="font-omedium text-lg">Disagreements</Text>
                  <Text className="font-omedium text-2xl text-secondary-100">
                    {optionSelected.filter((option) => option === null).length}
                  </Text>
                </View>
                <View className="ml-6">
                  <Text className="font-omedium text-lg">Compliance Param</Text>
                  <Text className="font-omedium text-2xl text-secondary-100">
                    {scoreCalculated}
                  </Text>
                </View>
              </View>
            </ViewShot>

            <View
              style={{ width }}
              className="absolute bottom-0 left-0 flex-1 p-2 bg-primary flex-row justify-between items-center"
            >
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-[250px] p-4 rounded-xl bg-secondary-100 justify-center items-center flex-row"
                onPress={() => {
                  navigate.goBack();
                }}
              >
                <Text className="text-white font-oextrabold text-2xl mr-1">
                  DONE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-4 rounded-2xl bg-primary border-[2px] border-secondary-100 justify-center items-center flex-row"
                onPress={shareContent}
              >
                <Entypo name="share" size={32} color="#433D8B" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Score;
