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
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    width: "48%", // Adjust the width to leave some space for margin
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100, // Adjust the height based on your preference
    marginBottom: 5,
    resizeMode: "cover",
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 17,
    color: "orange",
    marginBottom: 5,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
  },
});
