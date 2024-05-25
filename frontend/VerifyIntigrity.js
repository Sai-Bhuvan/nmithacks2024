import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RPC_URL = "https://testnet-rpc.coinex.net/";

// Smart contract address and ABI
const contractAddress = "0x8942c02Dd77C4d3352b051798567778635A94333";
const contractABI = require("./deviceContractABI.json");

const senderAddress = "0x3599cED19B48700eD5574D40a7b25DF7aeD9E2fB";
const privateKey =
  "c0e2a44482ca956308c432349422152904c3ffcb620da0cf266e4faf47cd1cab";

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
const contract = new web3.eth.Contract(contractABI, contractAddress);

const TranserPhone = ({ navigation }) => {
  //   const [username, setUsername] = useState("");
  const [deviceId, setdeviceId] = useState("");
  const [cameraId, setcameraId] = useState("");
  const [batteryId, setbatteryId] = useState("");

  //   const deviceData = {
  //     deviceId: "a", // replace with actual device ID
  //     cameraId: "a", // replace with actual camera ID
  //     batteryId: "a", // replace with actual battery ID
  //     exists: true, // this should match your contract's logic
  //   };

  const handleVerification = async () => {
    const deviceData = {
      cameraId: cameraId,
      deviceId: deviceId,
      batteryId: batteryId,
    };

    try {
      const gasPrice = await web3.eth.getGasPrice();
      const data = contract.methods.verifyIntegrity(deviceData).encodeABI();
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

      // Transaction successful, handle different cases
      switch (receipt.status) {
        case true:
          // Transaction successful, handle different responses from the contract
          const response = await contract.methods
            .verifyIntegrity(deviceData)
            .call();
          switch (response) {
            case "owner":
              // Device belongs to the owner
              Alert.alert(
                "Success",
                "Device verification successful. Device belongs to the owner."
              );
              break;
            case "not_owner":
              // Device doesn't belong to the owner
              Alert.alert(
                "Warning",
                "Device verification failed. Device doesn't belong to the owner."
              );
              break;
            case "camera_sus":
              // Camera suspicion
              Alert.alert(
                "Warning",
                "Device verification failed. Suspicious camera detected."
              );
              break;
            case "battery_sus":
              // Battery suspicion
              Alert.alert(
                "Warning",
                "Device verification failed. Suspicious battery detected."
              );
              break;
            default:
              // Unexpected response
              Alert.alert("Error", "Unexpected response from the contract.");
          }
          break;
        case false:
          // Transaction failed
          Alert.alert("Error", "Transaction failed.");
          break;
        default:
          // Unexpected status
          Alert.alert("Error", "Unexpected status.");
      }
    } catch (error) {
      console.error("Error transferring phone:", error);
      Alert.alert(
        "Error",
        "An error occurred while transferring the phone. Please try again."
      );
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
      <Text style={styles.welcomeText}>Transfer phone to other person</Text>
      <TextInput
        style={styles.input}
        placeholder="Device id"
        value={deviceId}
        onChangeText={setdeviceId}
      />
      <TextInput
        style={styles.input}
        placeholder="cameraid"
        secureTextEntry={true}
        value={cameraId}
        onChangeText={setcameraId}
      />
      <TextInput
        style={styles.input}
        placeholder="cameraid"
        secureTextEntry={true}
        value={batteryId}
        onChangeText={setbatteryId}
      />
      <Button title="verify device " onPress={handleVerification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TranserPhone;
