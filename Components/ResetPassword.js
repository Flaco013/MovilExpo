import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import Logo from "/Users/alexisgasga1/todo-list-mobile/assets/ToDoTask.png";

export default function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleOldPasswordChange = (text) => {
    setOldPassword(text);
    setError("");
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    setError("");
  };

  const handleConfirmNewPasswordChange = (text) => {
    setConfirmNewPassword(text);
    setError("");
  };

  const handleResetPassword = () => {
    // Basic validation
    if (!oldPassword || oldPassword.length < 6) {
      setError("Old password is invalid");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    // Perform the password reset logic here

    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);
  };

  return (
    <View style={{ backgroundColor: "#3CC9CE", flex: 1.0 }}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Password Reset</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={handleOldPasswordChange}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={handleNewPasswordChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          value={confirmNewPassword}
          onChangeText={handleConfirmNewPasswordChange}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginLeft: 120,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginLeft: 20,
    fontWeight: "bold",
    fontFamily: "Cochin",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 240,
    margin: 12,
    marginLeft: 80,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginTop: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
