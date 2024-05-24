import "react-native-gesture-handler";
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
// import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import SideMenu from "./SideMenu";
import LocationComponent from "./LocationComponent";
import { useNavigation } from "@react-navigation/native";
import TranserPhone from "./TranserPhone";
import SignupScreen from "./SignupScreen";
import CustomTextInput from "./CustomTextInput";

const Drawer = createDrawerNavigator();

function TransactionsScreen() {
  return (
    <View style={styles.centered}>
      <TouchableOpacity style={styles.menuButton} onPress={() => openDrawer()}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>
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
    <PaperProvider>
      <SignupScreen/>
    </PaperProvider>
    // <NavigationContainer>
    //   <Drawer.Navigator
    //     drawerContent={(props) => <SideMenu {...props} />}
    //     screenOptions={{ headerShown: false }}
    //   >
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    //     <Drawer.Screen name="Transactions" component={TransactionsScreen} />
    //     <Drawer.Screen name="Settings" component={SettingsScreen} />
    //     <Drawer.Screen name="LocationComponent" component={LocationComponent} />
    //     <Drawer.Screen name="transfer" component={TranserPhone} />
    //   </Drawer.Navigator>
    // </NavigationContainer>
    
    // <CustomTextInput/>
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

AppRegistry.registerComponent(appName, () => App);
