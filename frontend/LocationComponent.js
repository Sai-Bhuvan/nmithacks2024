import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Geolocation from "react-native-geolocation-service";

import Web3 from "web3";

const LocationComponent = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const contractAddress = "0x8942c02Dd77C4d3352b051798567778635A94333";
  const contractABI = require('./contractABI.json');

  const senderAddress = "0x3599cED19B48700eD5574D40a7b25DF7aeD9E2fB";
  const privateKey =
    "c0e2a44482ca956308c432349422152904c3ffcb620da0cf266e4faf47cd1cab";

  const deviceContractAbi = require('./deviceContractABI.json');
  const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
  const contract = new web3.eth.Contract(contractABI, contractAddress);

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

  function fetchLocation() {
    // get device contract address
    const deviceContractRes = await contract.methods.getDeviceContract().send({
      from: senderAddress,
      to: contractAddress
    });
    console.log(deviceContractRes.contractAddress);

    // emit getLocation
    const deviceContract = new web3.eth.Contract(deviceContractAbi, deviceContractRes.contractAddress);

    const gasPrice = await web3.eth.getGasPrice();

    const data = contract.methods
      .tryFetchLocation(username, password).encodeABI();

    const value = web3.utils.toWei("0", "ether");

    const tx = {
      from: senderAddress,
      to: contractAddress,
      gasPrice: gasPrice,
      // gas: 300000, // Adjust gas limit as needed
      value: value,
      data: data,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    // wait for it to return ()
    deviceContract.events.returnLocation().on('data', (e) => {
      // update location
      const { location } = e.returnValues;
      setLocation(location);
    });
  }

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
        <Text>{location}</Text>
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
