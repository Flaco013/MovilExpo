import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import loginStyles from "./Styles";

const Settings = () => {
  const navigation = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigateToProfileSettings = () => {
    navigation.navigate("ProfileSettings");
  };

  const navigateToPasswordSettings = () => {
    navigation.navigate("PasswordSettings");
  };

  const handleLogout = () => {
    // Display a confirmation dialog
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => setIsLoggingOut(false),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            setIsLoggingOut(true);
            // Navigate back to the login screen
            navigation.navigate("Login");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateToProfileSettings}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Profile Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToPasswordSettings}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Password Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    //backgroundColor: "#f7f7f7", // Light background color
  },
  button: {
    backgroundColor: "#eee",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#333", // Dark text color
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff6347", // Tomato color
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  logoutButtonText: {
    color: "white", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
