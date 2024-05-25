import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import Web3 from "web3";
import { useNavigation } from "@react-navigation/native";

const RPC_URL = "https://testnet-rpc.coinex.net/";

// Smart contract address and ABI
const contractAddress = "0x8942c02Dd77C4d3352b051798567778635A94333";
const contractABI = require("./deviceContractABI.json");

const senderAddress = "0x3599cED19B48700eD5574D40a7b25DF7aeD9E2fB";
const privateKey =
  "c0e2a44482ca956308c432349422152904c3ffcb620da0cf266e4faf47cd1cab";

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
const contract = new web3.eth.Contract(contractABI, contractAddress);

const TransferPhone = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState("");
  const [cameraId, setCameraId] = useState("");
  const [batteryId, setBatteryId] = useState("");
  const [userId, setuserId] = useState("");
  const [password, setpassword] = useState("");
  const [dis, setdis] = new useState(false);

  const handleVerification = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const data = contract.methods
        .verifyIntegrity(userId, password, deviceId, cameraId, batteryId)
        .encodeABI();
      const value = web3.utils.toWei("0", "ether");

      const tx = {
        from: senderAddress,
        to: contractAddress,
        gasPrice: gasPrice,
        value: value,
        data: data,
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      if (receipt.status) {
        const response = await contract.methods
          .verifyIntegrity(deviceId, cameraId, batteryId)
          .call();
        switch (response) {
          case "owner":
            Alert.alert(
              "Success",
              "Device verification successful. Device belongs to the owner."
            );
            break;
          case "not_owner":
            Alert.alert(
              "Warning",
              "Device verification failed. Device doesn't belong to the owner."
            );
            break;
          case "camera_sus":
            Alert.alert(
              "Warning",
              "Device verification failed. Suspicious camera detected."
            );
            break;
          case "battery_sus":
            Alert.alert(
              "Warning",
              "Device verification failed. Suspicious battery detected."
            );
            break;
          default:
            Alert.alert("Error", "Unexpected response from the contract.");
        }
      } else {
        Alert.alert("Error", "Transaction failed.");
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
      <Text style={styles.welcomeText}>Verify Integrity of the phone </Text>
      <TextInput
        style={styles.input}
        placeholder="User Id"
        value={userId}
        onChangeText={setuserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Device id"
        value={deviceId}
        onChangeText={setDeviceId}
      />
      <TextInput
        style={styles.input}
        placeholder="Camera id"
        value={cameraId}
        onChangeText={setCameraId}
      />
      <TextInput
        style={styles.input}
        placeholder="Battery id"
        value={batteryId}
        onChangeText={setBatteryId}
      />
      <Button
        mode="elevated"
        onPress={() => {
          setdis(true);
          handleVerification();
        }}
        disabled={dis}
        style={{ marginTop: 20 }}
      >
        Verify
      </Button>
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
    fontSize: 16,
    color: "#333",
    width: 350,
    margin: 10,
  },
});

export default TransferPhone;
