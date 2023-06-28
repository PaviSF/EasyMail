import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setMail } from "../../features/user";
import { useState } from "react";
import CardView from "./CardView";

const StoreEmail = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    primaryEmail: "",
    secondaryEmail: "",
    isPrimary: true,
    isSet: false,
  });

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
      await AsyncStorage.setItem("my-key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
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
            placeholder={user.primaryEmail}
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
            placeholder={user.secondaryEmail}
            style={styles.emailInput}
            onChangeText={handleSecondaryEmailChange}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (
              isEmailValid(email.primaryEmail) &&
              isEmailValid(email.secondaryEmail)
            ) {
              handleIsSet();
              dispatch(setMail(email));
              storeData(email);
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
