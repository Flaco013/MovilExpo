import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import loginStyles from "./Styles";
import { useNavigation } from "@react-navigation/native";

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

  const validateName = (name) => /^[a-zA-Z]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^[^\d]\w{9,}$/.test(password);

  const handleFirstNameChange = (text) => {
    // Check if the input contains only letters
    if (/^[a-zA-Z]*$/.test(text)) {
      setFirstName(text);
    }
  };

  const handleLastNameChange = (text) => {
    // Check if the input contains only letters
    if (/^[a-zA-Z]*$/.test(text)) {
      setLastName(text);
    }
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
      } else {
        // Use Firebase Authentication to create a new user
        await createUserWithEmailAndPassword(auth, email, password);

        // After successful registration, navigate to the Home screen
        console.log("Registration successful!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
    }

    // Hide the keyboard after registration attempt
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
      <Text style={loginStyles.title}>PAZ SUSHI BAR</Text>
      <View style={loginStyles.container}>
        <Text>First Name:</Text>
        <TextInput
          style={loginStyles.input}
          onChangeText={handleFirstNameChange}
          value={firstName}
          placeholder="Enter your first name"
        />

        <Text>Last Name:</Text>
        <TextInput
          style={loginStyles.input}
          onChangeText={handleLastNameChange}
          value={lastName}
          placeholder="Enter your last name"
        />

        <Text>Email:</Text>
        <TextInput
          style={loginStyles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text>Password:</Text>
        <TextInput
          style={loginStyles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={handleRegister}>
          <View style={loginStyles.registerButton}>
            <Text style={{ color: "white" }}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
