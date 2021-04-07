import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Fire } from "../../config";
import Logo from "./logo.png";
const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      Fire.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace("MainApp");
        } else {
          navigation.replace("GetStarted");
        }
      });
    }, 3000);
  }, []);
  return (
    <View style={styles.pages}>
      <Image source={Logo} />
      <Text style={styles.title}>Adadokter</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: "#56AEAA",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 20, fontWeight: "600", color: "white" },
});
