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
import { settingStyles } from "./Styles";

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
      <View style={settingStyles.container}>
        <TouchableOpacity onPress={navigateToProfileSettings}>
          <View style={settingStyles.button}>
            <Text style={settingStyles.buttonText}>Profile Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToPasswordSettings}>
          <View style={settingStyles.button}>
            <Text style={settingStyles.buttonText}>Password Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <View style={settingStyles.logoutButton}>
            <Text style={settingStyles.logoutButtonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Settings;
