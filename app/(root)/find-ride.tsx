import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { icons, images } from "@/constants";
import {
  PageTitleStyles,
  RideLayoutStyles,
  ServicesListStyles,
  UtilsStyles,
} from "@/styles/CustomeStyles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getPreciseDistance } from "geolib";
import { setSelectedService } from "@/store/reducers/serviceSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setSelectedLocation } from "@/store/reducers/locationSlice";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

const FindRide = () => {
  const dispatch = useDispatch();
  const currentLocation = useSelector<RootState, Location | null>(
    (state: RootState) => state.location.currentLocation
  );
  const selectedLocation = useSelector<RootState, Location | null>(
    (state: RootState) => state.location.selectedLocation
  );
  const selectedService = useSelector(
    (state: RootState) => state.service.selectedService
  );

  const [dateTime, setDateTime] = useState(new Date());
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [fare, setFare] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [tripType, setTripType] = useState("Single Trip"); // Default trip type
  const [surgeMultiplier, setSurgeMultiplier] = useState(1);
  const [passengers, setPassengers] = useState(1);

  const [selectedAddress, setSelectedAddress] = useState<string>(
    selectedLocation?.address || ""
  );

  const perKmRateSingleTrip = 24;
  const perKmRateRoundTrip = 16;

  // if (!currentLocation || !selectedLocation) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading map data...</Text>
  //     </View>
  //   );
  // }

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      if (pickerMode === "date") {
        setDateTime((prevDateTime) => new Date(selectedDate.getTime()));
        setPickerMode("time");
        setShowPicker(true);
      } else if (pickerMode === "time") {
        const updatedDateTime = new Date(
          dateTime.setHours(selectedDate.getHours(), selectedDate.getMinutes())
        );
        setDateTime(updatedDateTime);
        setFormattedDateTime(
          updatedDateTime.toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setShowPicker(false);
      }
    } else {
      setShowPicker(false);
    }
  };

  const openDateTimePicker = () => {
    setPickerMode("date");
    setShowPicker(true);
  };

  const determineSurgeMultiplier = () => {
    const currentHour = new Date().getHours();
    if (
      (currentHour >= 7 && currentHour <= 10) ||
      (currentHour >= 17 && currentHour <= 21)
    ) {
      return 1.5;
    }
    return 1;
  };

  useEffect(() => {
    if (currentLocation && selectedLocation) {
      const dist = getPreciseDistance(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        }
      );
      const kmDistance = dist / 1000; // Convert to km
      const finalDistance =
        tripType === "Round Trip" ? kmDistance * 2 : kmDistance; // Double for round trip
      setDistance(finalDistance.toFixed(2));
    }
  }, [currentLocation, selectedLocation, tripType]);

  useEffect(() => {
    const multiplier = determineSurgeMultiplier();
    setSurgeMultiplier(multiplier);
  }, []);

  useEffect(() => {
    if (distance) {
      const baseFare = 50;
      const perKmRate =
        tripType === "Round Trip" ? perKmRateRoundTrip : perKmRateSingleTrip;
      const minimumFare = 100;

      const calculatedFare = Math.max(
        (baseFare + parseFloat(distance) * perKmRate) * surgeMultiplier,
        minimumFare
      );
      setFare(calculatedFare.toFixed(2));
    }
  }, [distance, surgeMultiplier, tripType]);

  // Handle Increment
  const handleIncrement = () => {
    setPassengers((prev) => prev + 1);
  };

  // Handle Decrement
  const handleDecrement = () => {
    if (passengers > 1) {
      setPassengers((prev) => prev - 1);
    }
  };

  const toggleService = (service: "Outstation" | "Intercity") => {
    dispatch(setSelectedService(service));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View
            style={[RideLayoutStyles.rideContainer, { paddingHorizontal: 15 }]}
          >
            <Text style={PageTitleStyles.title}>Find a ride</Text>
            <View style={styles.inputContainer}>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>From</Text>
                <Text style={styles.dataText} numberOfLines={1}>
                  {currentLocation?.address}
                </Text>
              </View>
              <View>
                <Image source={icons.target} style={styles.inputIcon} />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>To</Text>
                <View style={styles.googleContainer}>
                  <GooglePlacesAutocomplete
                    placeholder={selectedLocation?.address || "Search location"}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      if (details) {
                        const updatedLocation = {
                          latitude: details.geometry.location.lat,
                          longitude: details.geometry.location.lng,
                          address: data.description,
                        };
                        dispatch(setSelectedLocation(updatedLocation));
                        setSelectedAddress(data.description);
                      }
                    }}
                    query={{
                      key: googlePlacesApiKey,
                      language: "en",
                      components: "country:in",
                    }}
                    textInputProps={{
                      value: selectedAddress,
                      onChangeText: (text) => setSelectedAddress(text),
                    }}
                    styles={{
                      textInputContainer: {
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      },
                      textInput: {
                        backgroundColor: "#F6F8FA",
                        fontSize: 16,
                        fontFamily: "Jakarta-SemiBold",
                        color: "#333333",
                        width: "100%",
                        placeholderTextColor: "#333333",
                      },
                      listView: {
                        backgroundColor: "white",
                        position: "relative",
                        top: 0,
                        width: "100%",
                        borderRadius: 10,
                        shadowColor: "#d4d4d4",
                        zIndex: 99,
                      },
                    }}
                    enablePoweredByContainer={false}
                  />
                </View>
              </View>
              <View>
                <Image source={icons.map} style={styles.inputIcon} />
              </View>
            </View>
            <ScrollView>
              <View>
                <View
                  style={[
                    ServicesListStyles.serviceListContainer,
                    { marginBottom: 10, marginTop: 0 },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      ServicesListStyles.iconContainer,
                      selectedService === "Outstation" &&
                        ServicesListStyles.activeIconContainer,
                    ]}
                    onPress={() => toggleService("Outstation")}
                  >
                    <Image
                      source={images.outstation}
                      style={ServicesListStyles.icon}
                    />
                    <Text
                      style={[
                        ServicesListStyles.serviceTitle,
                        selectedService === "Outstation" &&
                          ServicesListStyles.activeTitle,
                      ]}
                    >
                      Outstation
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      ServicesListStyles.iconContainer,
                      selectedService === "Intercity" &&
                        ServicesListStyles.activeIconContainer,
                    ]}
                    onPress={() => toggleService("Intercity")}
                  >
                    <Image
                      source={images.intercity}
                      style={ServicesListStyles.icon}
                    />
                    <Text
                      style={[
                        ServicesListStyles.serviceTitle,
                        selectedService === "Intercity" &&
                          ServicesListStyles.activeTitle,
                      ]}
                    >
                      Ride
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={openDateTimePicker}
                >
                  <View style={styles.dataContainer}>
                    <Text style={styles.dataLabel}>When</Text>
                    <Text style={styles.dataText}>
                      {formattedDateTime || "Select date and time"}
                    </Text>
                  </View>
                  <View>
                    <Image source={icons.arrowRight} style={styles.inputIcon} />
                  </View>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                  <View style={styles.dataContainer}>
                    <Text style={styles.dataLabel}>Distance</Text>
                    {distance ? (
                      <Text style={styles.dataText}>{distance} km</Text>
                    ) : (
                      <Text style={styles.dataText}>Calculating...</Text>
                    )}
                  </View>
                  <View>
                    <Image source={icons.map} style={styles.inputIcon} />
                  </View>
                </View>
                <View style={styles.rideTypeContainer}>
                  <Text style={styles.dataLabel}>Trip Type</Text>
                  <View style={styles.tripContainer}>
                    <TouchableOpacity
                      style={[
                        styles.tripTypeButton,
                        tripType === "Single Trip" && styles.selectedButton,
                      ]}
                      onPress={() => setTripType("Single Trip")}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          tripType === "Single Trip" && styles.selectedText,
                        ]}
                      >
                        Single Trip
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.tripTypeButton,
                        tripType === "Round Trip" && styles.selectedButton,
                      ]}
                      onPress={() => setTripType("Round Trip")}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          tripType === "Round Trip" && styles.selectedText,
                        ]}
                      >
                        Round Trip
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.rideTypeContainer}>
                  <Text style={styles.dataLabel}>Passengers</Text>
                  <View style={styles.passengersContainer}>
                    <TouchableOpacity
                      onPress={handleDecrement}
                      style={styles.buttonPassengerIcon}
                    >
                      <Image
                        source={icons.minus}
                        style={styles.passengerIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.passengersText}>{passengers}</Text>
                    <TouchableOpacity
                      onPress={handleIncrement}
                      style={styles.buttonPassengerIcon}
                    >
                      <Image source={icons.plus} style={styles.passengerIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.dataContainer}>
                    <Text style={styles.dataLabel}>Estimated Fare</Text>
                    {fare ? (
                      <Text style={styles.dataText}>₹ {fare}</Text>
                    ) : (
                      <Text style={styles.dataText}>Calculating...</Text>
                    )}
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.dataContainer}>
                    <Text style={styles.dataLabel}>Payment Method</Text>
                    <Text style={styles.dataText}>Cash</Text>
                  </View>
                  <View>
                    <Image source={icons.cash} style={styles.cashIcon} />
                  </View>
                </View>
                {showPicker && (
                  <DateTimePicker
                    value={dateTime}
                    mode={pickerMode}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleDateChange}
                  />
                )}
              </View>
              <View>
                <CustomButton
                  title="Find a driver"
                  onPress={() => router.push(`/(root)/confirm-ride`)}
                />
              </View>
            </ScrollView>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FindRide;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6F8FA",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 13,
  },
  inputIcon: {
    width: 22,
    height: 22,
  },
  cashIcon: {
    width: 30,
    height: 24,
  },
  dataLabel: {
    fontSize: 14,
    fontFamily: "Jakarta-Medium",
    color: "#858585",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "90%",
  },
  dataText: {
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
    color: "#333333",
  },
  googleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 50,
    width: "100%",
    marginLeft: -10,
    padding: 0,
  },
  rideTypeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#F6F8FA",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 13,
  },
  tripContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 8,
  },
  tripTypeButton: {
    backgroundColor: "#F6F8FA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a6a4a4",
    padding: 6,
    paddingHorizontal: 15,
    marginRight: 15,
  },
  selectedButton: {
    borderColor: "#0286FF",
    borderWidth: 1,
    backgroundColor: "#0286FF",
  },
  selectedText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
    color: "#333333",
  },
  passengersContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  buttonPassengerIcon: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderColor: "#0286FF",
    borderWidth: 1,
  },
  passengerIcon: {
    width: 20,
    height: 20,
  },
  passengersText: {
    fontSize: 35,
    fontFamily: "Jakarta-Bold",
    color: "#333333",
    marginTop: -10,
  },
});
