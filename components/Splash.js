import { useCallback, useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { setMail } from "../features/user";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GridPage from "./MainGrid/GridPage";
import StoreEmail from "./UserData/StoreEmail";

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const [appIsReady, setAppIsReady] = useState(false);
  // const [user, setUser] = useState({
  //   primaryEmail: "",
  //   secondaryEmail: "",
  //   isPrimary: true,
  //   isSet: false,
  // });
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  useEffect(() => {
    async function prepare() {
      try {
        const data = await getData();
        console.log(data);
        if (data !== null) {
          dispatch(setMail(data));
        }
        console.log(data, "hello");
      } catch (error) {
        // Handle the error here
        console.log(error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, [appIsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      //console.log(e);
    }
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* <Text>{user.secondaryEmail}</Text>
      <Button
        title="button"
        onPress={() => console.log(user.secondaryEmail, user.isSet)}
      /> */}
      {user.isSet ? <GridPage /> : <StoreEmail />}
    </View>
  );
}
