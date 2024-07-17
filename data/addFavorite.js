import url from "./url";
import { Alert } from "react-native";

async function AddFavorite(id, user) {
  try {
    const res = await fetch(`${url}/api/v1/user/add-to-favorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, user }),
    });
    const data = await res.json();
    if (res.ok && data.success === true) {
      Alert.alert("Added Successfully");
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error");
  }
}

export default AddFavorite;
