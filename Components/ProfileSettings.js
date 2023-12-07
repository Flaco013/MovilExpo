// ProfileSettings.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import loginStyles from "./Styles";

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
      // Validation
      if (!/^[a-zA-Z ]+$/.test(firstName)) {
        alert("Invalid first name. Please use only letters.");
        return;
      }

      if (!/^[a-zA-Z ]+$/.test(lastName)) {
        alert("Invalid last name. Please use only letters.");
        return;
      }

      if (!/^[a-zA-Z ]+$/.test(city)) {
        alert("Invalid city. Please use only letters.");
        return;
      }

      if (!/^\d{5}$/.test(zipCode)) {
        alert("Invalid zip code. It should be exactly 5 digits.");
        return;
      }

      // Update Firebase Authentication display name
      await updateProfile(auth.currentUser, {
        displayName: firstName + " " + lastName,
      });

      // Update Firestore user data
      const userDocRef = doc(firestore, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        address,
        city,
        zipCode,
      });

      alert("Changes saved successfully!");

      console.log("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
      <View style={styles.container}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Name:</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) =>
              setFirstName(text.replace(/[^a-zA-Z ]/g, ""))
            }
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) =>
              setLastName(text.replace(/[^a-zA-Z ]/g, ""))
            }
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
            onChangeText={(text) => setCity(text.replace(/[^a-zA-Z ]/g, ""))}
            placeholder="Enter your city"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Zip Code:</Text>
          <TextInput
            style={styles.input}
            value={zipCode}
            onChangeText={(text) =>
              setZipCode(text.replace(/[^0-9]/g, "").slice(0, 5))
            }
            placeholder="Enter your zip code"
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <TouchableOpacity onPress={saveChanges}>
          <View style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
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
    backgroundColor: "#fff", // Set background color
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18, // Increase font size
    fontWeight: "bold", // Add bold style
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    borderColor: "#ccc", // Lighter border color
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 24, // Add more top margin
  },
  saveButtonText: {
    color: "white",
    fontSize: 18, // Increase font size
    fontWeight: "bold", // Add bold style
  },
});

export default ProfileSettings;
