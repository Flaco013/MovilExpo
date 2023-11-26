import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import LogoImage from "/Users/alexisgasga1/todo-list-mobile/assets/ToDoTask.png";

export default function Logo() {
  return <Image source={LogoImage} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginLeft: 120,
  },
});
