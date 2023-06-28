import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import GridPage from "./components/MainGrid/GridPage";
import SendPicture from "./components/Camera/SendPicture";
import StoreEmail from "./components/UserData/StoreEmail";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Profile from "./components/Profile/Profile";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setMail } from "./features/user";

const Stack = createNativeStackNavigator();
const AppName = "EASY MAIL";

export default function Root() {
 const userState = useSelector((state) => state.user.value.isSet);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const email = await getData();
      dispatch(setMail(email));
    }
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const headerOptions = {
    title: AppName,
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#4284f5", color: "white" },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AudioDesign">
        {userState ? (
          <Stack.Screen
            name="GridPage"
            component={GridPage}
            options={({ navigation }) => ({
              title: AppName,
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#4284f5", color: "white" },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Profile")
                  }}
                >
                  <AntDesign name="profile" size={24} color="white" />
                </TouchableOpacity>
              ),
            })}
          />
        ) : (
          <Stack.Screen
            name="StoreEmail"
            component={StoreEmail}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="SendPicture"
          component={SendPicture}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
