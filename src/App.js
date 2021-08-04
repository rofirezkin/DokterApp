import React, { useEffect, useState } from "react";
import Router from "./router";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { Loading } from "./components";
import { Provider, useSelector } from "react-redux";
import store from "./redux";

import { YellowBox } from "react-native";
import { Fire } from "./config";

const MainApp = () => {
  const stateGlobal = useSelector((state) => state);

  YellowBox.ignoreWarnings(["Setting", "react-devtools"]);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
