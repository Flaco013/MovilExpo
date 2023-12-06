// ProfileSettings.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const ProfileSettings = () => {
  const auth = getAuth();
  const firestore = getFirestore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setFirstName(currentUser.displayName.split(" ")[0] || "");
      setLastName(currentUser.displayName.split(" ")[1] || "");
    }

    const fetchData = async () => {
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();

        if (userData) {
          setAddress(userData.address || "");
          setCity(userData.city || "");
          setZipCode(userData.zipCode || "");
        }
      }
    };

    fetchData();
  }, [auth, firestore]);

  const saveChanges = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: firstName + " " + lastName,
      });

      const userDocRef = doc(firestore, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        address,
        city,
        zipCode,
      });

      console.log("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>City:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Zip Code:</Text>
        <TextInput
          style={styles.input}
          value={zipCode}
          onChangeText={setZipCode}
          placeholder="Enter your zip code"
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

export default ProfileSettings;
