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
} from "react-native";

export default function Cuisine({ data, onAddToCart }) {
  const [searchText, setSearchText] = useState("");

  // Filter the data based on the search text
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.price.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddButtonPress = (item) => {
    // Call the onAddToChart function with the selected item
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

      {/* Display filtered data in two columns per row */}
      <View style={styles.rowContainer}>
        {filteredData.map((item, index) => (
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
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff", // Background color
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    width: "48%", // Adjust the width to leave some space for margin
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd", // Border color
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff", // Background color
  },
  image: {
    width: "100%",
    height: 120, // Adjust the height based on your preference
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333", // Text color
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
