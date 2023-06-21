import React from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import FineLine from "./FineLine";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const TextEditor = ({ onTextChange }) => {
  const richText = React.useRef();
  const handleChange = (value) => {
    onTextChange(value);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <RichEditor ref={richText} onChange={(des) => handleChange(des)} />
        </KeyboardAvoidingView>
      </ScrollView>
      <FineLine />

      <RichToolbar
        selectedIconTint={{ color: "blue" }}
        editor={richText}
        actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
        iconMap={{ [actions.heading1]: handleHead }}
      />
    </SafeAreaView>
  );
};

export default TextEditor;
