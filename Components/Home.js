import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import loginStyles from "./Styles";

export default function Home() {
  const navigation = useNavigation();

  function handleMenuPress() {
    console.log("Menu button pressed");
  }

  function handleButtonPress(buttonText) {
    console.log(`${buttonText} button pressed`);
    // Navigate to CuisineScreen when the Cuisine button is pressed
    if (buttonText === "CUISINE") {
      navigation.navigate("CuisineScreen");
    }
  }

  function handleOrdersPress() {
    console.log("Orders button pressed");
    // Navigate to the Orders screen
    navigation.navigate("Orders");
  }

  function handleMapPress() {
    console.log("Map button pressed");
    // Navigate to the Map screen
    navigation.navigate("Map");
  }

  function handleSettingsPress() {
    console.log("Settigns button pressed");
    // Navigate to the Map screen
    navigation.navigate("Settings");
  }
  return (
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={loginStyles.title}>PAZ SUSHI BAR</Text>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, left: 20 }}
          onPress={handleMenuPress}
        >
          <AntDesign name="menuunfold" size={24} color="black" />
        </TouchableOpacity>

        {/* Cart button in the top-right corner */}
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={() => navigation.navigate("Cart")}
        >
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>

        <View style={{ width: "80%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 10,
            }}
            onPress={() => handleButtonPress("CUISINE")}
          >
            <ImageBackground
              source={require("/Users/alexisgasga1/todo-list-mobile/assets/images9.jpeg")}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={loginStyles.title}>CUISINE</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Orders button */}
          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 20,
            }}
            onPress={handleOrdersPress}
          >
            <ImageBackground
              source={require("/Users/alexisgasga1/todo-list-mobile/assets/orders.jpeg")}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={loginStyles.title}>Orders</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 20,
            }}
            onPress={handleMapPress}
          >
            <ImageBackground
              source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi13.jpeg")}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={loginStyles.title}>Locations</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 20,
            }}
            onPress={handleSettingsPress}
          >
            <ImageBackground
              source={require("/Users/alexisgasga1/todo-list-mobile/assets/settings2.png")}
              style={{
                width: "100%",
                height: 140,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={loginStyles.title}>Settings</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
