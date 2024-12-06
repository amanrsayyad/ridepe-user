import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  placeholder,
  value,
  textContentType,
  keyboardType,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.inputField}>
            {icon && <Image source={icon} style={styles.inputIcon} />}
            <TextInput
              style={styles.textInput}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
    marginBottom: 5,
  },
  inputField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F6F8FA",
    borderRadius: 25,
    // borderWidth: 1,
    // borderColor: "#0286FF",
  },
  textInput: {
    padding: 15,
    fontFamily: "Jakarta-SemiBold",
    fontSize: 15,
    flex: 1,
    textAlign: "left",
  },
  inputIcon: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
});
