import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import url from "../data/url.js";
import { useFocusEffect } from "expo-router";
const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [categoryChosen, setCategoryChosen] = useState("");

  async function GetUser() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const userData = await fetchUserData(token);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
      console.error(error);
    }
  }

  async function fetchUserData(token) {
    try {
      const res = await fetch(`${url}/api/v1/user/get-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        return data.userData;
      } else {
        Alert.alert(JSON.stringify(data.message));
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    }
  }

  useFocusEffect(
    useCallback(() => {
      GetUser();
    })
  );

  return (
    <UserContext.Provider
      value={{ user, setUser, categoryChosen, setCategoryChosen }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
