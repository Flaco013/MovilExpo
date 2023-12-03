import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import loginStyles from "./Components/Styles";
import firebase from "firebase/app"; // Import 'firebase' as a whole module
import "firebase/auth";
import { Provider } from "react-redux";

import store from "./Components/store";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import CuisineScreen from "./Components/CusineScreen";
import Cuisine from "./Components/Cuisine";
import Cart from "./Components/Cart";
import CheckOut from "./Components/CheckOut";
import Orders from "./Components/Orders";

const Stack = createStackNavigator();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0cxmSSpXPxnI7-58_9AnbEH3w5CdD-Ds",
  authDomain: "sushi-a342c.firebaseapp.com",
  projectId: "sushi-a342c",
  storageBucket: "sushi-a342c.appspot.com",
  messagingSenderId: "81101161015",
  appId: "1:81101161015:web:c5911a6d4ec5412b81f5b2",
  measurementId: "G-T17SV05SPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Cuisine" component={Cuisine} />
          <Stack.Screen name="CuisineScreen" component={CuisineScreen} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerLeft: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
