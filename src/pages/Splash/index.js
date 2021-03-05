import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Logo from "./logo.png";
const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("GetStarted");
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
