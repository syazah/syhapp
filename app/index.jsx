import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { frontData } from "../data/frontScreen";
import { router, useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContextProvider";

const WelcomeComponent = () => {
  const listRef = useRef(null);
  const [activeItem, setActiveItem] = useState(0);

  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.replace("/quiz");
    }
  }, [user, router]);
  return (
    <SafeAreaView className="h-full">
      <FlatList
        ref={listRef}
        data={frontData}
        renderItem={({ item }) => {
          return (
            <ContentFrontScreen
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              listRef={listRef}
              item={item}
            />
          );
        }}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

const ContentFrontScreen = ({ item, listRef, activeItem, setActiveItem }) => {
  const { height, width } = Dimensions.get("window");

  function handleScroll() {
    if (item.id === 2) {
      return router.navigate("/signin");
    }
    scrollIndex = item.id + 1;
    setActiveItem(scrollIndex);
    listRef.current.scrollToIndex({ animated: true, index: scrollIndex });
  }

  const zoomIn = {
    0: {
      scale: 1,
    },
    1: {
      scale: 1.2,
    },
  };
  return (
    <Animatable.View
      animation={activeItem === item.id ? "fadeIn" : ""}
      delay={item.id * 100}
    >
      <View
        style={{ width: width, height: height }}
        className={`${
          item.id === 1 ? "bg-tertiary" : "bg-secondary"
        } justify-center p-6`}
      >
        {/* IMAGE  */}
        {item.id === 0 ? (
          <Animatable.Image
            animation={activeItem === item.id ? zoomIn : ""}
            source={require("../assets/front/front1.png")}
            className="w-[100%] h-[50%]"
            resizeMode="contain"
          />
        ) : item.id === 1 ? (
          <Animatable.Image
            animation={activeItem === item.id ? zoomIn : ""}
            source={require("../assets/front/front2.png")}
            className="w-[100%] h-[50%]"
            resizeMode="contain"
          />
        ) : (
          <Animatable.Image
            animation={activeItem === item.id ? zoomIn : ""}
            source={require("../assets/front/front3.png")}
            className="w-[100%] h-[50%]"
            resizeMode="contain"
          />
        )}
        {/* TEXT  */}
        <View className="w-full p-2 justify-center items-center my-4">
          <Animatable.Text
            animation={activeItem === item.id ? "slideInUp" : ""}
            duration={500}
            easing={"ease-in-cubic"}
            className={`text-3xl font-obold  text-white
             text-center my-2`}
          >
            {item.title}
          </Animatable.Text>
          <Animatable.Text
            animation={activeItem === item.id ? "slideInUp" : ""}
            duration={700}
            easing={"ease-in-cubic"}
            className={`text-sm font-omedium text-white
            text-center my-2`}
          >
            {item.desc}
          </Animatable.Text>
        </View>
        {/* INDICATORS  */}
        <View className="w-full flex-row gap-1 justify-center items-center my-2">
          <View
            className={`w-[12px] h-[12px] rounded-full ${
              item.id === 0 ? "bg-zinc-50" : "bg-zinc-400"
            }`}
          ></View>
          <View
            className={`w-[12px] h-[12px] rounded-full ${
              item.id === 1 ? "bg-zinc-50" : "bg-zinc-400"
            }`}
          ></View>
          <View
            className={`w-[12px] h-[12px] rounded-full ${
              item.id === 2 ? "bg-zinc-50" : "bg-zinc-400"
            }`}
          ></View>
        </View>
        {/* CONTINUE  */}
        <View className="justify-center items-center p-4">
          <TouchableOpacity
            activeOpacity={0.8}
            className={`justify-center items-center w-full p-4 px-4 rounded-full bg-${item.inverseColor}`}
            onPress={handleScroll}
          >
            <Text
              className={`font-semibold text-white
               text-xl`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

export default WelcomeComponent;
