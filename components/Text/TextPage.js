import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import TextEditor from "./TextEditor";

const sendIcon = require("../../assets/send.png");

export default function TextPage() {
  const [emailText, setEmailText] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability();
  }, []);

  const sendMail = (body) => {
    if (body) {
      const formattedBody = `<html><body>${body}</body></html>`;

      MailComposer.composeAsync({
        body: formattedBody,
        recipients: [user.isPrimary ? user.primaryEmail : user.secondaryEmail],
        isHtml: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextEditor onTextChange={setEmailText} />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          sendMail(emailText);
        }}
      >
        <Image source={sendIcon} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 20,
    marginTop: 20,
    position: "relative", // Added position relative to the container
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white", // Added marginBottom to create space for the button
  },
  buttonContainer: {
    position: "absolute", // Positioned the button absolutely within the container
    bottom: 10, // Positioned at the bottom
    right: 10, // Positioned at the right
    borderRadius: 100,
    backgroundColor: "#4284f5",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    tintColor: "white",
    height: 30,
    width: 30,
  },
  textEditIcon: {
    height: 18,
    width: 18,
    marginRight: 10,
  },
});
