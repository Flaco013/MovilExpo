// PasswordSettings.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

  const saveChanges = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      console.log("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity onPress={saveChanges}>
        <View style={styles.saveButton}>
          <Text style={{ color: "white" }}>Save Changes</Text>
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
});

export default PasswordSettings;
