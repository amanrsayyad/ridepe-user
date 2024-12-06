import { icons } from "@/constants";
import { PageTitleStyles, UtilsStyles } from "@/styles/CustomeStyles";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Settings = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={[UtilsStyles.bg, UtilsStyles.pagePadding, { flex: 1 }]}>
      <Text style={PageTitleStyles.title}>Settings</Text>

      <View style={styles.links}>
        <TouchableOpacity style={styles.link}>
          <View>
            <Text style={styles.linkText}>Update Profile</Text>
            <Text style={styles.description}>+91********37</Text>
          </View>
          <Image source={icons.arrowRight} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => {
            router.push("/(root)/(settings)/change-language");
          }}
        >
          <View>
            <Text style={styles.linkText}>Language</Text>
            <Text style={styles.description}>Default Language</Text>
          </View>
          <Image source={icons.arrowRight} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <View>
            <Text style={styles.linkText}>Night Mode</Text>
            <Text style={styles.description}>System</Text>
          </View>
          <Image source={icons.arrowRight} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <View>
            <Text style={styles.linkText}>Rules & Terms</Text>
          </View>
          <Image source={icons.arrowRight} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.actionLinks}>
        <TouchableOpacity style={[styles.actionLink]} onPress={handleSignOut}>
          <Text style={[styles.logout, styles.actionLinkText]}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionLink}>
          <Text style={[styles.deleteAccount, styles.actionLinkText]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  actionLinks: {
    gap: 4,
  },
  actionLink: { marginBottom: 30 },
  actionLinkText: {
    fontSize: 17,
    fontFamily: "Jakarta-Medium",
  },
  logout: {
    color: "#333333",
  },
  deleteAccount: {
    color: "#FF0000",
  },
  links: {},
  link: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  linkText: {
    fontSize: 17,
    fontFamily: "Jakarta-SemiBold",
  },
  description: {
    color: "#858585",
    fontSize: 15,
    fontFamily: "Jakarta-Regular",
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
});
