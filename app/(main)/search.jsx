import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import url from "../../data/url";
import { router, useNavigation } from "expo-router";
import { UserContext } from "../../context/UserContextProvider";

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [query, setQuery] = useState("");

  const { setCategoryChosen } = useContext(UserContext);
  // SEARCH FOR DETAILS
  async function GetSearchedQuiz() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/get-searched-quiz/${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setSearchData(data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error");
    }
  }
  // GET DETAILS
  async function handleRefresh() {
    try {
      setRefreshing(true);
      await getCategories();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCategories() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/api/v1/user/get-categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.success === true) {
        setCategories(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error");
    }
  }
  useEffect(() => {
    handleRefresh();
    setSearchData(null);
  }, []);
  useEffect(() => {
    if (query.length >= 3) {
      GetSearchedQuiz();
    } else {
      setSearchData(null);
    }
  }, [query]);

  return (
    <SafeAreaView className="bg-secondary w-full flex-1">
      <View className="w-full h-[15%] p-4">
        {/* SEARCH  */}
        <Animatable.View
          animation={"slideInDown"}
          className="p-2 h-[50px] bg-[#12112f] rounded-xl flex-row justify-center items-center"
        >
          <AntDesign
            className="w-[10%]"
            name="search1"
            size={24}
            color="white"
          />
          <TextInput
            onChangeText={(text) => {
              setQuery(text.toLowerCase());
            }}
            placeholder="Search Compliance, Id..."
            placeholderTextColor={"white"}
            className="text-white w-[90%] ml-2 font-osemibold text-lg"
          />
        </Animatable.View>
      </View>

      {/* CATEGORIES */}

      <Animatable.View
        animation={"slideInUp"}
        className="w-full flex-1 bg-primary rounded-t-2xl"
      >
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            contentContainerStyle={{ width: "100%", flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            {searchData === null || searchData.length === 0 ? (
              <>
                {/* SUBJECTS  */}
                <View>
                  <View className="p-2 mt-2 border-b-[2px] border-secondary">
                    <Text className="font-osemibold text-xl">
                      Compliance Subjects
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{
                      marginTop: 4,
                      flexGrow: 1,
                    }}
                  >
                    {categories?.complianceSubjects.map((subject, index) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            setCategoryChosen(subject);
                            return router.navigate("/view-category/category");
                          }}
                          key={index}
                          className="w-[300px] h-[100px] justify-start items-start rounded-md bg-secondary ml-2 p-2"
                        >
                          <Text className="font-olight text-base text-primary capitalize">
                            {subject}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
                {/* TITLE  */}
                <View>
                  <View className="p-2 border-b-[2px] border-secondary">
                    <Text className="font-osemibold text-xl">
                      Compliance Titles
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{
                      marginTop: 4,
                      flexGrow: 1,
                    }}
                  >
                    {categories?.complianceTitles.map((subject, index) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => {
                            setCategoryChosen(subject);
                            return router.navigate("/view-category/category");
                          }}
                          key={index}
                          className="w-[300px] h-[100px] justify-start items-start rounded-md bg-secondary ml-2 p-1"
                        >
                          <Text className="font-olight text-base text-primary capitalize p-2">
                            {subject}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* SUBTITLES  */}
                <View>
                  <View className="p-2 mt-2 border-b-[2px] border-secondary">
                    <Text className="font-osemibold text-xl">Compliances</Text>
                  </View>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{
                      marginTop: 4,
                      flexGrow: 1,
                    }}
                  >
                    {categories?.complianceSubtitles.map((subject, index) => {
                      return (
                        <View
                          key={index}
                          className="w-[300px] h-[100px] justify-start items-start rounded-md bg-secondary ml-2 p-2"
                        >
                          <Text className="font-olight text-base text-primary capitalize">
                            {subject}
                          </Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </>
            ) : (
              searchData.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Start The Quiz",
                        `Do you want to start ${data.subtitle}`,
                        [
                          { text: "cancel", type: "cancel" },
                          {
                            text: "start",
                            onPress: () => {
                              return router.replace(`/run-quiz/${data._id}`);
                            },
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                    activeOpacity={0.6}
                    key={index}
                    className="w-full h-[100px] border-b-[2px] border-gray-200 p-2"
                  >
                    <Text className="text-xs">S: {data.subject}</Text>
                    <Text className="text-sm font-omedium">
                      {data.subtitle}
                    </Text>
                    <Text className="text-xs">T: {data.title}</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        )}
      </Animatable.View>
    </SafeAreaView>
  );
};

export default Search;
