import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Fire } from "../../config";
import Logo from "./logoNew.png";
const Splash = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          if (user.emailVerified === true) {
            navigation.replace("MainApp");
          } else {
            navigation.replace("EmailVerification");
          }
        } else {
          navigation.replace("GetStarted");
        }
      }, 3000);
    });
    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.pages}>
      <Image style={styles.logo} source={Logo} />
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
  logo: {
    width: 122,
    height: 107,
  },
  title: { fontSize: 20, fontWeight: "600", color: "white" },
});
