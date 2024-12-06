import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import customMapStyle from "@/lib/mapStyles";
import { images } from "@/constants";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

const MapScreen = () => {
  const currentLocation = useSelector<RootState, Location | null>(
    (state: RootState) => state.location.currentLocation
  );
  const selectedLocation = useSelector<RootState, Location | null>(
    (state: RootState) => state.location.selectedLocation
  );
  const [region, setRegion] = useState<Region | null>(null);

  // Dynamically calculate the region and set it based on the locations
  useEffect(() => {
    if (currentLocation && selectedLocation) {
      const latitudeDelta =
        Math.abs(currentLocation.latitude - selectedLocation.latitude) + 0.1;
      const longitudeDelta =
        Math.abs(currentLocation.longitude - selectedLocation.longitude) + 0.1;

      setRegion({
        latitude: (currentLocation.latitude + selectedLocation.latitude) / 2,
        longitude: (currentLocation.longitude + selectedLocation.longitude) / 2,
        latitudeDelta,
        longitudeDelta,
      });
    } else if (currentLocation) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [currentLocation, selectedLocation]);

  if (!region || !currentLocation) return null;

  return (
    <>
      <MapView
        style={styles.map}
        region={region || undefined}
        customMapStyle={customMapStyle}
        showsUserLocation={false}
        loadingEnabled={true}
        provider={PROVIDER_DEFAULT}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="Your Location"
          description="This is where you are!"
        >
          <Image source={images.mapMarker} style={{ width: 40, height: 40 }} />
        </Marker>

        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title="Your Location"
            description="This is where you are!"
          >
            <Image
              source={images.mapMarker}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        )}
        {currentLocation && selectedLocation && (
          <MapViewDirections
            origin={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            destination={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            apikey={googlePlacesApiKey || ""}
            strokeWidth={3}
            strokeColor="#333333"
            onError={(errorMessage) => {
              console.error("MapViewDirections Error:", errorMessage);
            }}
          />
        )}
      </MapView>
    </>
  );
};

export default MapScreen;

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
});
