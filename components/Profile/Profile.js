import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { setMail } from "../../features/user";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardView from "../UserData/CardView";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState({
    primaryEmail: user.primaryEmail,
    secondaryEmail: user.secondaryEmail,
    isPrimary: user.isPrimary,
    isSet: user.isSet,
  });

  function isEmailValid(text) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("my-key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handlePrimaryEmailChange = (text) => {
    const updatedEmail = { ...email, primaryEmail: text };
    setEmail(updatedEmail);
  };

  const handleSecondaryEmailChange = (text) => {
    const updatedEmail = { ...email, secondaryEmail: text };
    setEmail(updatedEmail);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <CardView>
        {edit ? (
          <>
            <View style={{ justifyContent: "center" }}>
              <TextInput
                onChangeText={handlePrimaryEmailChange}
                style={[styles.emailText, styles.editableText]}
                placeholder={user.primaryEmail}
              />
              <TextInput
                onChangeText={handleSecondaryEmailChange}
                style={[styles.emailText, styles.editableText]}
                placeholder={user.secondaryEmail}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (
                  isEmailValid(email.primaryEmail) &&
                  isEmailValid(email.secondaryEmail)
                ) {
                  setEdit(false);
                  storeData(email);
                  dispatch(setMail(email));
                }
              }}
              style={styles.button}
            >
              <Feather name="save" size={24} color="black" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={{ justifyContent: "center" }}>
              <Text style={[styles.emailText, styles.uneditableText]}>
                {user.primaryEmail}
              </Text>
              <Text style={[styles.emailText, styles.uneditableText]}>
                {user.secondaryEmail}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEdit(true);
              }}
              style={styles.button}
            >
              <Feather name="edit" size={24} color="black" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
      </CardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 110,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: { fontWeight: "500", paddingTop: 3 },
  emailText: {
    borderWidth: 2,
    borderRadius: 10,
  },
  uneditableText: { padding: 17, marginBottom: 20 },
  editableText: { padding: 15, marginBottom: 15 },
});

export default Profile;
