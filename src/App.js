import React from "react";
import Router from "./router";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
