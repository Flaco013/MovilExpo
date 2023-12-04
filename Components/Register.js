import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  ScrollView,
  Alert, // Import Alert for showing the alert dialog
} from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import loginStyles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker"; // Import Picker from the new package

const firebaseConfig = {
  apiKey: "AIzaSyD0cxmSSpXPxnI7-58_9AnbEH3w5CdD-Ds",
  authDomain: "sushi-a342c.firebaseapp.com",
  projectId: "sushi-a342c",
  storageBucket: "sushi-a342c.appspot.com",
  messagingSenderId: "81101161015",
  appId: "1:81101161015:web:c5911a6d4ec5412b81f5b2",
  measurementId: "G-T17SV05SPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("Mexico");
  const [state, setState] = useState("Baja California Sur");
  const [city, setCity] = useState("");
  const [showCityPicker, setShowCityPicker] = useState(false);

  const cityOptions = ["La Paz", "Cabo San Lucas", "San Jose del Cabo"];

  const validateName = (name) => /^[a-zA-Z]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^[^\d]\w{9,}$/.test(password);
  const validateZipCode = (zipCode) => /^\d+$/.test(zipCode);
  const validateCountry = (country) => /^[a-zA-Z]+$/.test(country);

  const handleFirstNameChange = (text) => {
    if (/^[a-zA-Z]*$/.test(text)) {
      setFirstName(text);
    }
  };

  const handleLastNameChange = (text) => {
    if (/^[a-zA-Z]*$/.test(text)) {
      setLastName(text);
    }
  };

  const handleZipCodeChange = (text) => {
    // Validate zip code format, but don't show alert here
    setZipCode(text);
  };

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (!validateName(firstName)) {
        alert("Invalid first name. Please use only letters.");
      } else if (!validateName(lastName)) {
        alert("Invalid last name. Please use only letters.");
      } else if (!validateEmail(email)) {
        alert("Invalid email address");
      } else if (!validatePassword(password)) {
        alert(
          "Invalid password. It should not start with a number and be at least 10 characters long."
        );
      } else if (city === "") {
        alert("Please select a city.");
      } else if (zipCode.length !== 5) {
        Alert.alert("Invalid zip code", "It must have exactly 5 digits.");
      } else {
        // Firebase registration and data storage...
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Store additional user information in Firestore
        const db = getFirestore(app);
        const userDocRef = doc(db, "users", user.uid);

        await setDoc(userDocRef, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          zipCode: zipCode,
          country: country,
          state: state,
          city: city,
        });

        console.log("Registration successful!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
    }

    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={loginStyles.scrollViewContainer}>
      <ImageBackground
        source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
        style={loginStyles.background}
      >
        <Text style={loginStyles.title}>PAZ SUSHI BAR</Text>
        <View style={loginStyles.container}>
          <Text style={loginStyles.label}>First Name:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={handleFirstNameChange}
            value={firstName}
            placeholder="Enter your first name"
          />

          <Text style={loginStyles.label}>Last Name:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={handleLastNameChange}
            value={lastName}
            placeholder="Enter your last name"
          />

          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={loginStyles.label}>Password:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Enter your password"
            secureTextEntry={true}
          />

          <Text style={loginStyles.label}>Address:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={(text) => setAddress(text)}
            value={address}
            placeholder="Enter your address"
          />

          <Text style={loginStyles.label}>City:</Text>
          <TouchableOpacity
            onPress={() => setShowCityPicker(!showCityPicker)}
            style={loginStyles.inputContainer}
          >
            <TextInput
              style={loginStyles.input}
              value={city}
              placeholder="Select your city"
              editable={false}
              pointerEvents="none" // This prevents the text input from receiving touches
            />
          </TouchableOpacity>

          {showCityPicker && (
            <Picker
              selectedValue={city}
              onValueChange={(itemValue) => {
                setCity(itemValue);
                setShowCityPicker(false);
              }}
              style={loginStyles.picker}
            >
              {cityOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          )}

          <Text style={loginStyles.label}>Zip Code:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={handleZipCodeChange}
            value={zipCode}
            placeholder="Enter your zip code"
            keyboardType="numeric"
            maxLength={5} // Set max length to 5 digits
          />

          <Text style={loginStyles.label}>Country:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={(text) => setCountry(text)}
            value={country}
            placeholder="Enter your country"
            editable={false}
          />

          <Text style={loginStyles.label}>State:</Text>
          <TextInput
            style={loginStyles.input}
            onChangeText={(text) => setState(text)}
            value={state}
            placeholder="Enter your state"
            editable={false}
          />

          <TouchableOpacity onPress={handleRegister}>
            <View style={loginStyles.registerButton}>
              <Text style={{ color: "white" }}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
