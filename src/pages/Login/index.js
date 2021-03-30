import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Gap, Input, Link } from "../../components/atoms";
import Logo from "./logo.png";
const Login = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.wrapper}>
          <Image source={Logo} style={styles.image} />
          <Text style={styles.text}>Masuk Dan Mulai Konsultasi</Text>
        </View>
        <View style={styles.loginForm}>
          <Gap height={30} />
          <Input label="Email Addres" />
          <Gap height={17} />
          <Input label="Password" />
          <Gap height={17} />
          <Link title="Forgot My Password" size={12} />
          <Gap height={40} />
          <Button
            type="secondary"
            text="secondary"
            title="Sign In"
            onPress={() => navigation.replace("MainApp")}
          />
          <Gap height={30} />
          <Link title="Create New Account" size={16} align="center" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  loginForm: {
    paddingHorizontal: 30,
  },
  wrapper: {
    backgroundColor: "#33B9B2",
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    height: "30%",
    padding: 25,
    flex: 1,
  },
  text: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    width: 188,
    marginTop: 10,
  },
  image: {
    height: 80,
    width: 100,
  },
});
