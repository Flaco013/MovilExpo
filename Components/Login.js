//import { Text, Image, StyleSheet } from "native-base";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Logo from "/Users/alexisgasga1/todo-list-mobile/assets/ToDoTask.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
    setError("");
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setError("");
  };

  const handleLogin = () => {
    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Invalid email address");
      return;
    }
    // Basic password validation (you can add more checks)
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    // If validation passes, you can proceed with authentication
    // Replace the following with your authentication logic
    // Example: send a request to your server for login

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleRegister = () => {
    navigation.navigate("SignUp"); // Navigate to the "Register" screen
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleResetPassword = () => {
    navigation.navigate("ResetPassword");
  };


  return (
    <>
      {/* La imagen puede ser una url o el path de una imagen en la carpeta */}

      <View style={{ backgroundColor: "#3CC9CE", flex: 1.0 }}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
          />

          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
          >
            <Text style={styles.buttonText}>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetPasswordButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
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
    width: 100,
    marginTop: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginTop: 10,
    alignSelf: "center",
  },

  forgotPasswordButton: {
    backgroundColor: "gray",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginTop: 10,
    alignSelf: "center",
  },
  resetPasswordButton: {
    backgroundColor: "orange",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginTop: 10,
    alignSelf: "center",
  },
});
