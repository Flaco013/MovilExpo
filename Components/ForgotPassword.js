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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
    setError("");
  };

  const handleSendEmail = () => {
    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    // Send the email logic here

    console.log("Sending email to:", email);
  };

  return (
    <View style={{ backgroundColor: "#3CC9CE", flex: 1.0 }}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.title}>Please enter your email</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Send Email</Text>
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
