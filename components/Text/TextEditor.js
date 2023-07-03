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
          
          <RichEditor
            ref={richText}
            onChange={(des) => handleChange(des)}
            placeholder="Write your content here..."
            androidHardwareAccelerationDisabled={true}
            initialHeight={200}
            onContentSizeChange={false}
            style={{height:200 }}
          />
          
        </KeyboardAvoidingView>
      </ScrollView>
      <FineLine />

      <RichToolbar
        selectedIconTint ="blue"
        iconTint="#312921"
        editor={richText}
        actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
        iconMap={{ [actions.heading1]: handleHead }}
      />
    </SafeAreaView>
  );
};

export default TextEditor;
