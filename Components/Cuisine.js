// Cuisine.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import loginStyles from "./Styles";

export default function Cuisine({ data, onAddToCart }) {
  const [searchText, setSearchText] = useState("");

  // Filter the data based on the search text
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.price.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddButtonPress = (item) => {
    onAddToCart(item);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for cuisine..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <ImageBackground
        source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
        style={loginStyles.background}
      >
        {/* Display filtered data in two columns per row */}
        <View style={styles.rowContainer}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <View key={index} style={styles.column}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity onPress={() => handleAddButtonPress(item)}>
                  <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.column}>
              <Text style={styles.notFoundText}>Item not found</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#59CDCE",
  },
  searchInput: {
    height: 40,

    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#59515E",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 8,
    borderColor: "black",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "orange",
    marginBottom: 5,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});
