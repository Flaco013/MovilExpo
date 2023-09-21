import React from "react";
import { NativeBaseProvider, Box, Container, View } from "native-base";
import CustomInput from "./CustomInput";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      {/*<Box flex={1} bg="#3CC9CE" alignItems="center" justifyContent="center">*/}
      {/*<Container>
          <Login />
          {/* Este componente es solo un ejemplo */}
      {/*<CustomInput text="Usuario" */}
      {/*</Container>*/}
      {/*</Box>*/}

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
