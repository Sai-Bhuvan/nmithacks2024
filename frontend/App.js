import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import SideMenu from "./SideMenu";

const Drawer = createDrawerNavigator();

function UsersScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.header}>Users</Text>
    </View>
  );
}

function OrdersScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.header}>Orders</Text>
    </View>
  );
}

function TransactionsScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.header}>Transactions</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.centered}>
      <Text style={styles.header}>Settings</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <SideMenu {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Users" component={UsersScreen} />
        <Drawer.Screen name="Orders" component={OrdersScreen} />
        <Drawer.Screen name="Transactions" component={TransactionsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
