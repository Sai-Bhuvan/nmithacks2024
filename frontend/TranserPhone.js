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
const contractAddress = "0x5839f5cC19cB2551113cA0C91BFD2399Dd31e68F";
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "deviceId",
            type: "string",
          },
          {
            internalType: "string",
            name: "cameraId",
            type: "string",
          },
          {
            internalType: "string",
            name: "batteryId",
            type: "string",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct DeviceData",
        name: "dd",
        type: "tuple",
      },
    ],
    name: "deRegisterDeviceContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "Error",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "deviceId",
            type: "string",
          },
          {
            internalType: "string",
            name: "cameraId",
            type: "string",
          },
          {
            internalType: "string",
            name: "batteryId",
            type: "string",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct DeviceData",
        name: "dd",
        type: "tuple",
      },
    ],
    name: "registerDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "pass",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "deviceId",
            type: "string",
          },
          {
            internalType: "string",
            name: "cameraId",
            type: "string",
          },
          {
            internalType: "string",
            name: "batteryId",
            type: "string",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct DeviceData",
        name: "dd",
        type: "tuple",
      },
    ],
    name: "registerDeviceContract",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "deviceAddress",
        type: "address",
      },
    ],
    name: "Success",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "battery",
    outputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "camera",
    outputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "a",
        type: "string",
      },
      {
        internalType: "string",
        name: "b",
        type: "string",
      },
    ],
    name: "compareStrings",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "contracts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "device",
    outputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "getDeviceContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const senderAddress = "0x3599cED19B48700eD5574D40a7b25DF7aeD9E2fB";
const privateKey =
  "c0e2a44482ca956308c432349422152904c3ffcb620da0cf266e4faf47cd1cab";

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
const contract = new web3.eth.Contract(contractABI, contractAddress);

const TranserPhone = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [devicedata, setdevicedata] = useState("");

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedDeviceData = await AsyncStorage.getItem("deviceData");
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
        if (storedDeviceData !== null) {
          setdevicedata(JSON.parse(storedDeviceData));
        }
      } catch (error) {
        console.error("Error retrieving data from storage:", error);
      }
    };

    fetchStoredData();
  }, []);

  const handleTransfer = async () => {
    // Here you can implement the logic for transferring phone to another person
    // console.log("Username:", username);
    // console.log("Password:", password);

    try {
      const gasPrice = await web3.eth.getGasPrice();

      const data = contract.methods
        .deRegisterDeviceContract(username, devicedata)
        .encodeABI();

      const value = web3.utils.toWei("0", "ether");

      const tx = {
        from: senderAddress,
        to: contractAddress,
        gasPrice: gasPrice,
        gas: 300000, // Adjust gas limit as needed
        value: value,
        data: data,
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("deviceData");

      Alert.alert("Success", "transfered phone successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Signup"),
        },
      ]);
    } catch (error) {
      console.error("Error tranfering phone:", error);
      Alert.alert(
        "Error",
        "An error occurred while transfering the phone. Please try again."
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
      {/* <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      /> */}
      <Button title="deregister device " onPress={handleTransfer} />
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
