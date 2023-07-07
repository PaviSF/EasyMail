import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { setMail } from "../../features/user";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notifyMessage } from "../../constants/NotificationUtils";
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
      const errorMessage = "Failed to store emails" + e;
      notifyMessage(errorMessage);
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

  const handleIsPrimary = () => {
    const updatedEmail = { ...email, isPrimary: true };
    setEmail(updatedEmail);
    storeData(updatedEmail);
    dispatch(setMail(updatedEmail));
  };

  const handleIsNotPrimary = () => {
    const updatedEmail = { ...email, isPrimary: false };
    setEmail(updatedEmail);
    storeData(updatedEmail);
    dispatch(setMail(updatedEmail));
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <CardView>
        <View style={styles.extraCardDetail}>
          <View>
            {edit ? (
              <>
                <View style={{ justifyContent: "center" }}>
                  {/* Professional Email Editable Row */}
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.emailText]}>
                      <FontAwesome
                        name="suitcase"
                        size={24}
                        color="#4284f5"
                        style={{ marginRight: 10, marginTop: 3 }}
                      />
                      <TextInput
                        onChangeText={handlePrimaryEmailChange}
                        value={email.primaryEmail}
                        editable={true}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => handleIsPrimary()}
                      style={[styles.radioButton]}
                    >
                      <MaterialCommunityIcons
                        name={
                          email.isPrimary ? "radiobox-marked" : "radiobox-blank"
                        }
                        size={35}
                        color={email.isPrimary ? "#4284f5" : "#4284f5"}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Personal Email Editable Row */}
                  <View style={{ flexDirection: "row" }}>
                    <View style={[styles.emailText]}>
                      <Ionicons
                        name="person"
                        size={24}
                        color="#4284f5"
                        style={{ marginRight: 9, marginTop: 2 }}
                      />
                      <TextInput
                        onChangeText={handleSecondaryEmailChange}
                        value={email.secondaryEmail}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => handleIsNotPrimary()}
                      style={[styles.radioButton]}
                    >
                      <MaterialCommunityIcons
                        name={
                          !email.isPrimary
                            ? "radiobox-marked"
                            : "radiobox-blank"
                        }
                        size={35}
                        color={!email.isPrimary ? "#4284f5" : "#4284f5"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  onPress={async () => {
                    if (
                      isEmailValid(email.primaryEmail) &&
                      isEmailValid(email.secondaryEmail)
                    ) {
                      setEdit(false);
                      await storeData(email);
                      dispatch(setMail(email));
                    } else {
                      notifyMessage("Both fields are necessary");
                    }
                  }}
                  style={styles.button}
                >
                  <Feather name="save" size={24} color="#4284f5" />
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={{ justifyContent: "center" }}>
                {/* Professional Email Row */}
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.emailText]}
                    onPress={() => notifyMessage("Professional Email")}
                  >
                    <FontAwesome
                      name="suitcase"
                      size={24}
                      color="#4284f5"
                      style={{ marginRight: 10 }}
                    />
                    <Text>{user.primaryEmail}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleIsPrimary()}
                    style={[styles.radioButton]}
                  >
                    <MaterialCommunityIcons
                      name={
                        email.isPrimary ? "radiobox-marked" : "radiobox-blank"
                      }
                      size={35}
                      color={email.isPrimary ? "#4284f5" : "#4284f5"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Personal Email Row */}
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.emailText]}
                    onPress={() => notifyMessage("Personal Email")}
                  >
                    <Ionicons
                      name="person"
                      size={24}
                      color="#4284f5"
                      style={{ marginRight: 8 }}
                    />
                    <Text>{user.secondaryEmail}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleIsNotPrimary()}
                    style={[styles.radioButton]}
                  >
                    <MaterialCommunityIcons
                      name={
                        !email.isPrimary ? "radiobox-marked" : "radiobox-blank"
                      }
                      size={35}
                      color={!email.isPrimary ? "#4284f5" : "#4284f5"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                  onPress={() => {
                    setEdit(true);
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={styles.button}>
                    <Feather
                      name="edit"
                      size={24}
                      color="#4284f5"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.buttonText}>Edit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </CardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
  },
  buttonText: { fontWeight: "500", paddingTop: 3, color: "#4284f5" },
  emailText: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#4284f5",
    paddingRight: 40,
    padding: 15,
    marginBottom: 15,
    width: "87%",
  },

  radioButton: {
    marginTop: 10,
    marginLeft: 10,
  },
  extraCardDetail: { flexDirection: "row" },
});

export default Profile;
