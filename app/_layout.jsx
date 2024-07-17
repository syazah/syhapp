import { SplashScreen, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { UserContextProvider } from "../context/UserContextProvider";
import { QuizContextProvider } from "../context/QuizContextProvider";
SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  // GETTING FONTS
  const [fontsLoaded, error] = useFonts({
    "Outfit-Black": require("../assets/fonts/Outfit-Black.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
    "Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-Thin": require("../assets/fonts/Outfit-Thin.ttf"),
  });

  // EFFECTS
  //   FONT LOADING
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <UserContextProvider>
      <QuizContextProvider>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signin" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen
            name="profile-settings"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="run-quiz/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="submit-quiz/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="view-category/category"
            options={{ headerShown: false }}
          />
        </Stack>
      </QuizContextProvider>
    </UserContextProvider>
  );
};

export default RootLayout;
