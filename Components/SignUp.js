import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import Logo from "/Users/alexisgasga1/todo-list-mobile/assets/ToDoTask.png";

export default function SignUp() {
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

  const handleSignUp = () => {
    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    // Basic password validation
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // If validation passes, you can proceed with the sign-up logic
    // Replace the following with your sign-up logic
    // Example: send a request to your server to create an account

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={{ backgroundColor: "#3CC9CE", flex: 1.0 }}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
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
});
