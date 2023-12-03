import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import Cuisine from "./Cuisine";
import Cart from "./Cart";

import { useDispatch, connect } from "react-redux";
import { addToCart } from "./actions";

const CuisineScreen = ({ cuisineData, loading, addToCart, selectedItems }) => {
  const dispatch = useDispatch(); // Get access to the dispatch function

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true }); // Dispatch action to set loading to true

        const response = await fetch("http://192.168.1.69:3000/dishes");
        const data = await response.json();

        const simplifiedData = data.map((item) => ({
          id: item.id,
          imageUrl: item.picture,
          price: item.price,
          name: item.name,
        }));

        dispatch({ type: "SET_CUISINE_DATA", payload: simplifiedData }); // Dispatch action to set cuisineData
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false }); // Dispatch action to set loading to false
      }
    };

    fetchData();
  }, [dispatch]);
  const handleAddToChart = (item) => {
    console.log("Adding item to cart:", item);

    // Extract the required properties from the item
    const { id, name, price, imageUrl } = item;

    // Convert price to a number (remove the currency symbol)
    const numericPrice = parseFloat(price.replace("$", ""));

    // Dispatch the addToCart action with the selected item
    addToCart({ id, name, price: numericPrice, imageUrl });
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Cuisine data={cuisineData} onAddToCart={handleAddToChart} />
          <Cart selectedItems={selectedItems} />
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading,
  selectedItems: state.selectedItems,
  cuisineData: state.cuisineData,
});

export default connect(mapStateToProps, { addToCart })(CuisineScreen);
