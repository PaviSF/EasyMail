import { Platform, ToastAndroid, AlertIOS } from "react-native";

export function notifyMessage(msg) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios"){
    AlertIOS.alert(msg);
  } else {

  }
}