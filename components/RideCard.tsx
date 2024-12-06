import { icons, images } from "@/constants";
import { Text, View, Image, StyleSheet } from "react-native";
import { Ride } from "@/types/type";
import { formatDate, formatTime } from "@/lib/utils";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View style={styles.rideCardContainer}>
      <View style={styles.rideCard}>
        <View style={styles.fromToContainer}>
          <Image source={images.mapImage} style={styles.rideCardImage} />

          <View style={styles.fromToDetails}>
            <View style={styles.fromToView}>
              <Image source={icons.to} style={styles.iconFromTo} />
              <Text numberOfLines={1} style={styles.textFromTo}>
                {ride.origin_address}
              </Text>
            </View>
            <View style={styles.fromToView}>
              <Image source={icons.point} style={styles.iconFromTo} />
              <Text numberOfLines={1} style={styles.textFromTo}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateView}>
          <Text style={styles.dateTitle}>Date & Time</Text>
          <Text style={styles.dateText}>
            {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
          </Text>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateTitle}>Driver</Text>
          <Text style={styles.dateText}>
            {" "}
            {ride.driver.first_name} {ride.driver.last_name}
          </Text>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateTitle}>Car Seats</Text>
          <Text style={styles.dateText}>{ride.driver.car_seats}</Text>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateTitle}>Payment Status</Text>
          <Text style={styles.dateText}>{ride.payment_status}</Text>
        </View>
      </View>
    </View>
  );
};

export default RideCard;

const styles = StyleSheet.create({
  rideCardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 10,
    padding: 12,
  },
  rideCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fromToContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rideCardImage: {
    width: 80,
    height: 90,
    borderRadius: 10,
  },
  fromToDetails: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 10,
    columnGap: 5,
    flex: 1,
  },
  fromToView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    rowGap: 30,
    marginBottom: 7,
  },
  iconFromTo: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  textFromTo: {
    fontSize: 15,
    fontFamily: "Jakarta-Medium",
  },
  dateTimeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
  },
  dateView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
    marginBottom: 2,
    backgroundColor: "#F6F8FA",
  },
  dateTitle: {
    fontSize: 15,
    fontFamily: "Jakarta-SemiBold",
    color: "#858585",
  },
  dateText: {
    fontSize: 15,
    fontFamily: "Jakarta-SemiBold",
    color: "#333333",
  },
});
