import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GridPage from "./components/MainGrid/GridPage";
import TextPage from "./components/Text/TextPage";
import SendPicture from "./components/Camera/SendPicture";
import AudioBottomSheet from "./components/Audio/AudioBottomSheet";
import AudioDesign from "./components/Audio/AudioDesign";

const Stack = createNativeStackNavigator();
const AppName = "EASY MAIL";
const headerOptions = {
  title: AppName,
  headerTintColor: "white",
  headerStyle: { backgroundColor: "#4284f5", color: "white" },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AudioDesign">
        {/* <Stack.Screen name="AudioDesign" component={AudioDesign} options={headerOptions}/> */}
        <Stack.Screen
          name="GridPage"
          component={GridPage}
          options={headerOptions}
        />
        <Stack.Screen
          name="TextPage"
          component={TextPage}
          options={headerOptions}
        />
        <Stack.Screen
          name="SendPicture"
          component={SendPicture}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AudioBottomSheet"
          component={AudioBottomSheet}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
