import { icons } from "@/constants";
import { UtilsStyles } from "@/styles/CustomeStyles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapScreen from "@/components/MapScreen";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "@/store/reducers/locationSlice";
import GoogleTextInput from "@/components/GoogleTextInput";
import ServicesList from "@/components/ServicesList";

interface LocationSelect {
  description: string;
  latitude: number;
  longitude: number;
}

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleLocationSelect = (location: LocationSelect) => {
    const { description, latitude, longitude } = location;

    dispatch(
      setSelectedLocation({
        latitude,
        longitude,
        address: description,
      })
    );

    router.push({
      pathname: "/find-ride",
      params: { latitude, longitude, address: description },
    });
  };

  return (
    <SafeAreaView style={UtilsStyles.bg}>
      <>
        <View style={UtilsStyles.pagePadding}>
          <View
            style={[UtilsStyles.jBetween, UtilsStyles.my5, UtilsStyles.fRow]}
          >
            <Text style={styles.headerText}>
              Welcome,
              {user?.firstName ||
                user?.emailAddresses[0].emailAddress.split("@")[0]}
              👋
            </Text>
            <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
              <Image source={icons.out} style={styles.outIcon} />
            </TouchableOpacity>
          </View>
          <GoogleTextInput onLocationSelect={handleLocationSelect} />
          <ServicesList />
          <Text style={styles.homeText}>Your current location</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapScreen />
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 15,
    fontFamily: "Jakarta-ExtraBold",
  },
  signOutBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  outIcon: {
    width: 15,
    height: 15,
  },
  homeText: {
    fontSize: 17,
    fontFamily: "Jakarta-SemiBold",
    marginTop: 10,
    marginBottom: 7,
  },
  mapContainer: {
    height: 600,
    width: "100%",
    borderRadius: 10,
  },
});
