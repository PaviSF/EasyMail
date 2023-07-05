import { useCallback, useEffect, useState } from "react";
import { View} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { setMail } from "../features/user";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notifyMessage } from "../constants/NotificationUtils";

SplashScreen.preventAutoHideAsync();

export default function Splash({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        const data = await getData();
        if (data !== null) {
          dispatch(setMail(data));
        }
      } catch (error) {
      } finally {
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

  useEffect(() => {
    if (appIsReady && user.isSet) {
      navigation.navigate("GridPage");
    } else if (appIsReady) {
      navigation.navigate("StoreEmail");
    }
  }, [appIsReady, user.isSet, navigation]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      const errorMessage = "Failed to get data" + error;
      notifyMessage(errorMessage);    }
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
    </View>
  );
}
