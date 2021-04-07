import React, { useState } from "react";
import Router from "./router";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { Loading } from "./components";

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {loading && <Loading />}
    </>
  );
};

export default App;
