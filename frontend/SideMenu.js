import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SideMenu = ({ navigation }) => {
  const menuItems = [
    { title: "Home", routeName: "Home" },
    // { title: "Users", routeName: "Users" },
    // { title: "Orders", routeName: "Orders" },
    // { title: "Transactions", routeName: "Transactions" },
    // { title: "Settings", routeName: "Settings" },
    { title: "Get Location", routeName: "LocationComponent" },
    { title: " tranfer phone", routeName: "transfer" },
  ];

  const navigateToScreen = (routeName) => () => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={navigateToScreen(item.routeName)}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SideMenu;
