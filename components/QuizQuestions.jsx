import { View, Text, Dimensions, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContextProvider";
import { router, useNavigation } from "expo-router";

const QuizQuestions = ({
  item,
  mainIndex,
  listRef,
  questionLength,
  setProgressIndex,
  progressIndex,
}) => {
  const { width } = Dimensions.get("window");
  const { optionSelected, currentRunningQuiz, setScoreCalculated } =
    useContext(QuizContext);
  // CALCULATE SCORE
  async function calculateScoreAndMove() {
    let score = 0;
    for (let i = 0; i < currentRunningQuiz.questionLength; i++) {
      if (optionSelected[i] === currentRunningQuiz.questions[i].correctOption) {
        score += 100;
      }
    }
    setScoreCalculated(score);
    return router.replace(`/submit-quiz/${currentRunningQuiz.id.toString()}`);
  }

  // FLATLIST MOVE
  function handleFlatListMove() {
    setProgressIndex(mainIndex < questionLength - 1 ? progressIndex + 1 : 1);
    listRef.current.scrollToIndex({
      index: mainIndex < questionLength - 1 ? mainIndex + 1 : 0,
    });
  }
  return (
    <View style={{ width }}>
      <View className="p-4">
        <Text className="font-osemibold text-black text-lg">
          {item.question}
        </Text>

        {/* OPTIONS  */}
        <View className="mt-10">
          {item?.options.map((option, index) => {
            return (
              <Option
                key={index}
                option={option}
                index={index}
                mainIndex={mainIndex}
              />
            );
          })}
        </View>

        {/* BUTTON  */}
        <View className="w-full mt-10 items-end">
          <TouchableOpacity
            disabled={optionSelected[mainIndex] === null}
            activeOpacity={0.4}
            onPress={
              mainIndex === questionLength - 1
                ? () => {
                    Alert.alert(
                      "Do You Really Want To Submit ? ",
                      "Once Submitted The Score Will Be Added To Your Profile",
                      [
                        { text: "cancel", style: "cancel" },
                        {
                          text: "Submit",
                          onPress: () => calculateScoreAndMove(),
                        },
                      ]
                    );
                  }
                : handleFlatListMove
            }
            className={`px-4 bg-tertiary py-2 justify-center items-center rounded-lg border-2 ${
              optionSelected[mainIndex] === null ? "opacity-50" : ""
            }`}
          >
            <Text className="text-2xl font-osemibold text-primary">
              {mainIndex === questionLength - 1 ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Option = ({ option, mainIndex, index }) => {
  const { setOptionSelected, optionSelected } = useContext(QuizContext);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        let newOptionSelected = [...optionSelected];
        newOptionSelected[mainIndex] = index;
        setOptionSelected(newOptionSelected);
      }}
      className={`mb-4 w-full px-2 py-4 border-2 border-black rounded-lg justify-center item-center ${
        optionSelected[mainIndex] === index ? "bg-secondary " : ""
      }`}
    >
      <Text
        className={`font-bold text-xl  ${
          optionSelected[mainIndex] === index ? "text-primary " : ""
        }`}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

export default QuizQuestions;
