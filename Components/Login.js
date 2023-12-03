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
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { setUserProfile } from "./actions";
import { setUserId } from "./actions";
import { connect } from "react-redux";

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

const Login = ({ dispatch }) => {
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

      // signInWithEmailAndPassword is called directly on auth, not auth()
      await signInWithEmailAndPassword(auth, email, password);

      // Retrieve additional user information from Firestore
      const user = auth.currentUser; // Use currentUser instead of auth()
      const db = getFirestore(app);
      const userDocRef = doc(db, "users", user.uid);

      // Get the user profile data
      const userSnapshot = await getDoc(userDocRef);
      const userProfile = userSnapshot.data();

      // Log user information to the terminal
      console.log("Login successful!");
      console.log("User ID:", user.uid);

      console.log("User Name:", userProfile.firstName);
      console.log("User Last Name:", userProfile.lastName);
      console.log("User Email:", userProfile.email);
      console.log("User Address:", userProfile.address);
      console.log("city:", userProfile.city);
      console.log("State:", userProfile.sate);
      console.log("User Zip Code:", userProfile.zipCode);
      console.log("User Country:", userProfile.country);

      dispatch(setUserProfile(userProfile));
      dispatch(setUserId(user.uid));

      // Navigate to the next screen or perform other actions
      navigation.navigate("Home");
      //navigation.navigate("CheckOut", { totalPrice, userProfile });
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
};

export default connect()(Login);
