import { icons } from "@/constants";
import { PageTitleStyles, UtilsStyles } from "@/styles/CustomeStyles";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Help = () => {
  return (
    <View style={[UtilsStyles.bg, UtilsStyles.pagePadding, { flex: 1 }]}>
      <Text style={PageTitleStyles.title}>Help & Safety</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={icons.support} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={icons.contacts} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Emergency Contacts</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bellButton}>
        <Image source={icons.bell} style={styles.bellIcon} />
        <Text style={styles.bellText}>Call emergency</Text>
      </TouchableOpacity>
      <Text style={styles.helpText}>How you're protected</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={icons.help} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Before the ride</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={icons.safety} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Safety features</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={icons.twentyFourSeven} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>24/7 Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={icons.howWeCheck} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>How we check cars</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={icons.driverIdentity} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            Driver identity & selfie verification
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48.7%",
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "#333333",
    marginBottom: 10,
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontFamily: "Jakarta-Regular",
    fontSize: 14,
    color: "#fff",
    marginTop: 7,
    textAlign: "center",
  },
  bellButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FF847D",
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 1,
  },
  bellIcon: {
    width: 28,
    height: 28,
    marginTop: -5,
  },
  bellText: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 18,
    color: "#333333",
    marginLeft: 10,
    marginTop: -5,
  },
  helpText: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 17,
    color: "#333333",
    marginTop: 15,
    marginBottom: 10,
  },
});
