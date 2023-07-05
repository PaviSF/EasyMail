import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import GridPage from "./components/MainGrid/GridPage";
import SendPicture from "./components/Camera/SendPicture";
import StoreEmail from "./components/UserData/StoreEmail";
import ModalView from "./constants/ModalView";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Profile from "./components/Profile/Profile";
import { View } from "react-native";
import Splash from "./components/Splash";

const Stack = createNativeStackNavigator();
const AppName = "EASY MAIL";

export default function Root() {
  const [modalVisible, setModalVisible] = useState(false);
  const [whichFeature, setWhichFeature] = useState();

  const openModal = (text) => {
    setModalVisible(true);
    setWhichFeature(text);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const headerOptions = {
    title: AppName,
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#4284f5", color: "white" },
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EasyMail">

          <Stack.Screen
            name="Splash" 
            component={Splash}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GridPage"
            component={GridPage}
            options={() => ({
              title: AppName,
              headerShown: true,
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#4284f5", color: "white" },
              headerBackVisible: false, 
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    openModal(false);
                  }}
                >
                  <Ionicons name="person-circle" size={35} color="white" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="StoreEmail"
            component={StoreEmail}
            options={{ headerShown: false }}
          />

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
        <ModalView
          modalVisible={modalVisible}
          closeModal={closeModal}
          whichFeature={whichFeature}
        />
      </NavigationContainer>
    </View>
  );
}
