import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import loginStyles from "./Styles";
import { cuisineStyles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function Cuisine({ data, onAddToCart }) {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  // Filter the data based on the search text
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.price.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddButtonPress = (item) => {
    onAddToCart(item);
  };

  const handleCartPress = () => {
    // Navigate to the Cart screen when the cart button is pressed
    navigation.navigate("Cart");
  };

  return (
    <ScrollView style={cuisineStyles.container}>
      <View style={cuisineStyles.header}>
        {/* Search bar */}
        <TextInput
          style={cuisineStyles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />

        {/* Cart button */}
        <TouchableOpacity onPress={handleCartPress}>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
        style={loginStyles.background}
      >
        {/* Display filtered data in two columns per row */}
        <View style={cuisineStyles.rowContainer}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <View key={index} style={cuisineStyles.column}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={cuisineStyles.image}
                />
                <Text style={cuisineStyles.name}>{item.name}</Text>
                <Text style={cuisineStyles.price}>${item.price}</Text>
                <TouchableOpacity onPress={() => handleAddButtonPress(item)}>
                  <View style={cuisineStyles.addButton}>
                    <Text style={cuisineStyles.addButtonText}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={cuisineStyles.column}>
              <Text style={cuisineStyles.notFoundText}>Item not found</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
