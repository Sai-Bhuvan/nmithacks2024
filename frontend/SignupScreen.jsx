import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

import { View, Text, StyleSheet, Alert, TouchableOpacity, onPress, title} from 'react-native';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    console.log(username)
    // if (password !== confirmPassword) {
    //   Alert.alert('Password mismatch', 'Passwords do not match');
    //   return;
    // }

    // // Here you can handle the signup logic, like sending data to your backend
    // Alert.alert('Success', 'You have signed up successfully!');
  };

  return (
    <View style={styles.screen}>

      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          label = 'Username'
          // placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          label = 'Password'
          // placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Button mode="elevated" onPress={handleSignup} style = {{marginTop: 20}}>
          Register
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 10
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
    padding: 10,
    alignItems: 'center',
    // backgroundColor: "pearl"
  },
  input: {
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#ccc",
    fontSize: 16,
    color: "#333",
    width: 350,
    margin: 10
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default SignupScreen;
