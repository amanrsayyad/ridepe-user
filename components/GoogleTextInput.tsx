import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";
import "react-native-get-random-values";
import { GoogleTextInputStyles } from "@/styles/CustomeStyles";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const GoogleTextInput = ({ onLocationSelect }: { onLocationSelect: any }) => {
  return (
    <View
      style={[
        GoogleTextInputStyles.googleContainer,
        GoogleTextInputStyles.homeGoogleBg,
      ]}
    >
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        onPress={(data, details = null) => {
          if (details) {
            const location = {
              description: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            onLocationSelect(location);
          }
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
          components: "country:in",
        }}
        renderLeftButton={() => (
          <View style={GoogleTextInputStyles.iconView}>
            <Image
              source={icons.search}
              style={GoogleTextInputStyles.icon}
              resizeMode="contain"
            />
          </View>
        )}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginLeft: 7,
            position: "relative",
            shadowColor: "#d4d4d4",
            width: "95%",
          },
          textInput: {
            width: "95%",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            borderRadius: 200,
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
        fetchDetails={true}
        enablePoweredByContainer={false}
      />
    </View>
  );
};

export default GoogleTextInput;
