// ProfileSettings.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import loginStyles from "./Styles";
import { profileStyles } from "./Styles";
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
      <View style={profileStyles.container}>
        <View style={profileStyles.settingItem}>
          <Text style={profileStyles.settingText}>Name:</Text>
          <TextInput
            style={profileStyles.input}
            value={firstName}
            onChangeText={(text) =>
              setFirstName(text.replace(/[^a-zA-Z ]/g, ""))
            }
            placeholder="Enter your name"
          />
        </View>

        <View style={profileStyles.settingItem}>
          <Text style={profileStyles.settingText}>Last Name:</Text>
          <TextInput
            style={profileStyles.input}
            value={lastName}
            onChangeText={(text) =>
              setLastName(text.replace(/[^a-zA-Z ]/g, ""))
            }
            placeholder="Enter your last name"
          />
        </View>

        <View style={profileStyles.settingItem}>
          <Text style={profileStyles.settingText}>Address:</Text>
          <TextInput
            style={profileStyles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
          />
        </View>

        <View style={profileStyles.settingItem}>
          <Text style={profileStyles.settingText}>City:</Text>
          <TextInput
            style={profileStyles.input}
            value={city}
            onChangeText={(text) => setCity(text.replace(/[^a-zA-Z ]/g, ""))}
            placeholder="Enter your city"
          />
        </View>

        <View style={profileStyles.settingItem}>
          <Text style={profileStyles.settingText}>Zip Code:</Text>
          <TextInput
            style={profileStyles.input}
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
          <View style={profileStyles.saveButton}>
            <Text style={profileStyles.saveButtonText}>Save Changes</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProfileSettings;
