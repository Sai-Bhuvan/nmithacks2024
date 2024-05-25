import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const CustomTextInput = () => {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your text here"
        placeholderTextColor="#999"
        onChangeText={setText}
        value={text}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
    marginTop: 300,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    color: "#333",
  },
});

export default CustomTextInput;
