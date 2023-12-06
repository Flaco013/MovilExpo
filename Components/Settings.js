import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToProfileSettings}>
        <View style={styles.button}>
          <Text>Profile Settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToPasswordSettings}>
        <View style={styles.button}>
          <Text>Password Settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.button}>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: "#eee",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
});

export default Settings;
