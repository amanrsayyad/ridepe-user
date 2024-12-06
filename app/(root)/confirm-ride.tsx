import CustomButton from "@/components/CustomButton";
import { StyleSheet, Text, View } from "react-native";

const ConfirmRide = () => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>From</Text>
      </View>
      <CustomButton
        title="Find Now"
        // onPress={() => router.push(`/(root)/confirm-ride`)}
        className="mt-5"
      />
    </>
  );
};

export default ConfirmRide;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 5,
  },
  inputTitle: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 14,
    marginBottom: 5,
  },
});
