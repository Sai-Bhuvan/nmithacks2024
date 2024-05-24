import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DrawerItems = ({ navigation }) => {
  const [selectedTitle, setSelectedTitle] = React.useState("No items selected");

  const menuItems = [
    { title: "Users", routeName: "Users" },
    { title: "Orders", routeName: "Orders" },
    { title: "Transactions", routeName: "Transactions" },
    { title: "Settings", routeName: "Settings" },
  ];

  const onMenuItemPress = (title) => () => {
    setSelectedTitle(title);
    navigation.navigate(title); // Assuming route names match the titles
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{selectedTitle}</Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={onMenuItemPress(item.title)}
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
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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

export default DrawerItems;
