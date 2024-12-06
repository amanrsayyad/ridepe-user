import { images } from "@/constants";
import { ServicesListStyles } from "@/styles/CustomeStyles";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { setSelectedService } from "@/store/reducers/serviceSlice";

const ServicesList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleServiceClick = (service: "Outstation" | "Intercity") => {
    dispatch(setSelectedService(service));
    router.push("/find-ride");
  };

  return (
    <View style={ServicesListStyles.serviceListContainer}>
      <TouchableOpacity
        style={ServicesListStyles.homeIconContainer}
        onPress={() => handleServiceClick("Outstation")}
      >
        <Image source={images.outstation} style={ServicesListStyles.icon} />
        <Text style={ServicesListStyles.activeTitle}>Outstation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={ServicesListStyles.homeIconContainer}
        onPress={() => handleServiceClick("Intercity")}
      >
        <Image source={images.intercity} style={ServicesListStyles.icon} />
        <Text style={ServicesListStyles.activeTitle}>Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServicesList;
