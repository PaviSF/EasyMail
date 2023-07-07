import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setMail } from "../../features/user";
import { useState, useEffect } from "react";

import CardView from "./CardView";
import { notifyMessage } from "../../constants/NotificationUtils";

const StoreEmail = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      //console.log(e);
    }
  };

  const [email, setEmail] = useState({
    primaryEmail: user.primaryEmail,
    secondaryEmail: user.secondaryEmail,
    isPrimary: user.isPrimary,
    isSet: user.isSet,
  });
  const [readyToLogin, setReadyToLogin] = useState(false);

  useEffect(() => {
    async function prepare() {
      handleIsSet();
    }
    prepare();
  }, [readyToLogin]);

  useEffect(() => {
    const backAction = () => {
      // Check if the current route is GridPage
      if (navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  function isEmailValid(text) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  }

  const handlePrimaryEmailChange = (text) => {
    const updatedEmail = { ...email, primaryEmail: text };
    setEmail(updatedEmail);
  };

  const handleSecondaryEmailChange = (text) => {
    const updatedEmail = { ...email, secondaryEmail: text };
    setEmail(updatedEmail);
  };

  const handleIsSet = () => {
    const updatedEmail = { ...email, isSet: true };
    setEmail(updatedEmail);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      //console.log(jsonValue);
      await AsyncStorage.setItem("my-key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>
      <CardView>
        <View style={styles.emailInputRow}>
          <MaterialCommunityIcons
            style={styles.emailIcon}
            name="email"
            size={24}
            color="#4385f5"
          />
          <TextInput
            inputMode="email"
            placeholder={"Professional Email"}
            style={styles.emailInput}
            onChangeText={handlePrimaryEmailChange}
          />
        </View>
        <View style={styles.emailInputRow}>
          <MaterialCommunityIcons
            style={styles.emailIcon}
            name="email"
            size={24}
            color="#4385f5"
          />

          <TextInput
            inputMode="text"
            placeholder={"Personal Email"}
            style={styles.emailInput}
            onChangeText={handleSecondaryEmailChange}
          />
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (
              email.primaryEmail.length === 0 ||
              email.secondaryEmail.length === 0
            ) {
              notifyMessage("Both fields are mandatory");
            } else if (
              isEmailValid(email.primaryEmail) &&
              isEmailValid(email.secondaryEmail)
            ) {
              if (!(email.primaryEmail === email.secondaryEmail)) {
                try {
                  handleIsSet();
                  dispatch(setMail(email));
                  await storeData(email);
                  setReadyToLogin(true);
                } catch (e) {
                  console.log(e);
                }
              } else {
                notifyMessage("Both emails cannot be the same");
              }
            } else {
              notifyMessage("Invalid email format");
            }
          }}
        >
          <View style={styles.emailButton}>
            <Text style={{ color: "white" }}>Set your Email</Text>
          </View>
        </TouchableOpacity>
      </CardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  emailInputRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  emailInput: {
    borderColor: "#4385f5",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  emailIcon: { marginTop: 10, marginRight: 10 },
  emailButton: {
    backgroundColor: "#4385f5",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default StoreEmail;
