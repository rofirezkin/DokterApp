import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Input, Link } from "../../components/atoms";
import Logo from "./logo.png";
const Login = () => {
  return (
    <View style={styles.page}>
      <View style={styles.wrapper}>
        <Image source={Logo} />
        <Text>Masuk Dan Mulai Konsultasi</Text>
      </View>
      <Input />
      <Input />
      <Link />
      <Button title="Sign In" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    backgroundColor: gradient(red, yellow),
    flex: 1,
  },
  wrapper: {
    backgroundColor: "red",
    height: "35%",
  },
});
