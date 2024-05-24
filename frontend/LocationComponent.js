import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Geolocation from "react-native-geolocation-service";

const LocationComponent = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    setLoading(true);
    try {
      const granted = await requestLocationPermission();
      if (!granted) {
        setLoading(false);
        setError("Location permission denied");
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await Geolocation.requestAuthorization("whenInUse");
      return granted === "granted";
    } catch (err) {
      console.error("Error requesting location permission:", err);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>
      <Button
        title={loading ? "Getting Location..." : "Get Location"}
        onPress={getLocation}
        disabled={loading}
      />
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {location && (
        <View style={styles.locationContainer}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          {location.coords.altitude !== null && (
            <Text>Altitude: {location.coords.altitude}</Text>
          )}
          <Text>Accuracy: {location.coords.accuracy}</Text>
          <Text>Speed: {location.coords.speed}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  locationContainer: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  menuButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default LocationComponent;
