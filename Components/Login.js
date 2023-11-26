import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import loginStyles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      if (!validateEmail() || password === "") {
        alert("Invalid email or password.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);

      console.log("Login successful!");
      // Navigate to the next screen or perform other actions
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please check your email and password.");
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
      <Text style={loginStyles.title}>PAZ SUSHI BAR</Text>
      <View style={loginStyles.container}>
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

        <TouchableOpacity onPress={handleLogin}>
          <View style={loginStyles.loginButton}>
            <Text style={{ color: "white" }}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister}>
          <View style={loginStyles.registerButton}>
            <Text style={{ color: "white" }}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
