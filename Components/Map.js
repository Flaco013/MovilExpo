// MapViewComponent.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { mapStyles } from "./Styles";
const LaPazCoordinates = {
  latitude: 24.142,
  longitude: -110.312,
};

const CaboSanLucasCoordinates = {
  latitude: 22.8905,
  longitude: -109.9167,
};

const SanJoseDelCaboCoordinates = {
  latitude: 23.0608,
  longitude: -109.7011,
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
    <View style={mapStyles.container}>
      <MapView
        ref={mapRef}
        style={mapStyles.map}
        initialRegion={{
          latitude: LaPazCoordinates.latitude,
          longitude: LaPazCoordinates.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={LaPazCoordinates}
          title="Sushi La PAZ"
          description="Best sushi restaurant in La Paz"
        />

        <Marker
          coordinate={CaboSanLucasCoordinates}
          title="Sushi Cabo San Lucas"
          description="Best sushi restaurant in Cabo San Lucas"
        />

        <Marker
          coordinate={SanJoseDelCaboCoordinates}
          title="Sushi San Jose del Cabo"
          description="Cool sushi restaurant in San Jose del Cabo"
        />
      </MapView>

      <View style={mapStyles.zoomButtonsContainer}>
        <TouchableOpacity style={mapStyles.zoomButton} onPress={handleZoomIn}>
          <Text>Zoom In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mapStyles.zoomButton} onPress={handleZoomOut}>
          <Text>Zoom Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;
