import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const PasswordSettings = () => {
  const auth = getAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const saveChanges = async () => {
    try {
      // Validation
      if (currentPassword === "") {
        Alert.alert("Current Password cannot be empty.");
        return;
      }

      if (newPassword === "") {
        Alert.alert("New Password cannot be empty.");
        return;
      }

      if (newPassword.length < 9 || newPassword.length > 15) {
        Alert.alert("Password must be between 9 and 15 characters.");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        Alert.alert("New Passwords do not match.");
        return;
      }

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      console.log("Password changed successfully!");
      Alert.alert("Success", "Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error.message);
      Alert.alert("Error", "Current password is incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Current Password:</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter your current password"
          secureTextEntry
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>New Password:</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter your new password"
          secureTextEntry
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Confirm New Password:</Text>
        <TextInput
          style={styles.input}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirm your new password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={saveChanges}>
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
    color: "#555",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 24,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PasswordSettings;
