import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };
  return (
    <View>
      <View style={styles.authContainer}>
        <View style={styles.line} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={handleGoogleSignIn}
      >
        <Image source={icons.google} style={styles.logInIcon} />
        <Text style={styles.textBtn}>Log In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;

const styles = StyleSheet.create({
  authContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CED1DD",
  },
  or: {
    fontSize: 16,
  },
  btnContainer: {
    width: "100%",
    borderRadius: 25,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 25,
    paddingVertical: 13,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  textBtn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Jakarta-Bold",
  },
  logInIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
