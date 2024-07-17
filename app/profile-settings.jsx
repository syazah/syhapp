import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityComponent,
} from "react-native";
import { View } from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { useNavigation } from "expo-router";

const Settings = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="w-full flex-1 bg-secondary">
      <View
        className={"w-full h-[10%] p-2 flex-row justify-start items-center"}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="w-[50px] h-[50px] bg-secondary-100 rounded-full"
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={48}
            color="#17153B"
          />
        </TouchableOpacity>
        <Text className="text-3xl font-osemibold text-primary ml-2">
          Settings
        </Text>
      </View>

      {/* MAIN SETTINGS  */}
      <View className={"w-full h-[90%] bg-primary rounded-xl"}>
        {/* CHANGE AVATAR  */}
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full border-b-[2px] border-gray-300 p-2 flex justify-between items-center flex-row"
        >
          <Text className="font-osemibold text-secondary text-xl">
            Change Avatar
          </Text>
          <View className="flex flex-row justify-center items-center">
            <Image
              className="w-[40px] h-[40px]"
              source={require("../assets/avatar/avatar1.png")}
            />
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </View>
        </TouchableOpacity>
        {/* CHANGE AVATAR  */}
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full border-b-[2px] border-gray-300 p-2 flex justify-between items-center flex-row"
        >
          <Text className="font-osemibold text-secondary text-xl">
            Change Username
          </Text>
          <View className="flex flex-row justify-center items-center">
            <Text className="font-osemibold text-gray-400 text-xl ">
              @{user?.username}
            </Text>
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </View>
        </TouchableOpacity>
        {/* CHANGE EMAIL  */}
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full border-b-[2px] border-gray-300 p-2 flex justify-between items-center flex-row"
        >
          <Text className="font-osemibold text-secondary text-xl">
            Change Email
          </Text>
          <View className="flex flex-row justify-center items-center">
            <Text className="font-osemibold text-gray-400 text-xl ">
              {user?.email ? "Add Email" : user?.email}
            </Text>
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </View>
        </TouchableOpacity>
        {/* UPDATE PASSWORD  */}
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full border-b-[2px] border-gray-300 p-2 flex justify-between items-center flex-row"
        >
          <Text className="font-osemibold text-secondary text-xl">
            Update Password
          </Text>
          <View className="flex flex-row justify-center items-center">
            <Text className="font-osemibold text-gray-400 text-xl ">
              ********
            </Text>
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </View>
        </TouchableOpacity>
        {/* DELETE ACCOUNT  */}
        <TouchableOpacity
          activeOpacity={0.5}
          className="w-full border-b-[2px] border-gray-300 p-2 flex justify-between items-center flex-row"
        >
          <Text className="font-osemibold text-secondary text-xl">
            Delete Account
          </Text>
          <View className="flex flex-row justify-center items-center">
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
