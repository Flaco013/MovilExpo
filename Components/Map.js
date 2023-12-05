// MapViewComponent.js
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const LaPazCoordinates = {
  latitude: 24.142, // Replace with the actual latitude of La Paz
  longitude: -110.312, // Replace with the actual longitude of La Paz
};

const CaboSanLucasCoordinates = {
  latitude: 22.8905, // Replace with the actual latitude of Cabo San Lucas
  longitude: -109.9167, // Replace with the actual longitude of Cabo San Lucas
};

const SanJoseDelCaboCoordinates = {
  latitude: 23.0608, // Replace with the actual latitude of San Jose del Cabo
  longitude: -109.7011, // Replace with the actual longitude of San Jose del Cabo
};

const Map = () => {
  const mapRef = React.useRef(null);

  const handleZoomIn = () => {
    if (mapRef.current && mapRef.current.__lastRegion) {
      const { latitude, longitude, latitudeDelta, longitudeDelta } =
        mapRef.current.__lastRegion;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: latitudeDelta / 1.5,
        longitudeDelta: longitudeDelta / 1.5,
      });
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current && mapRef.current.__lastRegion) {
      const { latitude, longitude, latitudeDelta, longitudeDelta } =
        mapRef.current.__lastRegion;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: latitudeDelta * 1.5,
        longitudeDelta: longitudeDelta * 1.5,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: LaPazCoordinates.latitude,
          longitude: LaPazCoordinates.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Marker for La Paz */}
        <Marker
          coordinate={LaPazCoordinates}
          title="La Paz, BCS, Mexico"
          description="Beautiful city by the sea"
        />

        {/* Marker for Cabo San Lucas */}
        <Marker
          coordinate={CaboSanLucasCoordinates}
          title="Cabo San Lucas"
          description="Popular tourist destination"
        />

        {/* Marker for San Jose del Cabo */}
        <Marker
          coordinate={SanJoseDelCaboCoordinates}
          title="San Jose del Cabo"
          description="Charming town with historic charm"
        />
      </MapView>

      <View style={styles.zoomButtonsContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Text>Zoom In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text>Zoom Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  zoomButtonsContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  zoomButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
});

export default Map;
