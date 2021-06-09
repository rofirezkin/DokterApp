import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

import { Button, Gap, Input, Link } from "../../components/atoms";
import { Fire } from "../../config";
import { colors, storeData, useForm } from "../../utils";
import Logo from "./logo.png";
const Login = ({ navigation }) => {
  const [form, setForm] = useForm({ email: "", password: "" });

  const dispatch = useDispatch();
  const login = () => {
    console.log("form", form);
    dispatch({ type: "SET_LOADING", value: true });
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        console.log("success", res);
        dispatch({ type: "SET_LOADING", value: false });
        Fire.database()
          .ref(`doctors/${res.user.uid}/`)
          .once("value")
          .then((resDB) => {
            console.log("data user", resDB.val());
            if (resDB.val()) {
              storeData("user", resDB.val());
              navigation.replace("MainApp");
            }
          });
      })
      .catch((err) => {
        console.log("error", err);
        dispatch({ type: "SET_LOADING", value: false });
        showMessage({
          message: err.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  const showLoadingTemp = () => {
    console.log("halooo temporary");
    dispatch({ type: "SET_LOADING", value: true });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Image source={Logo} style={styles.image} />
          <Text style={styles.text}>Masuk Dan Mulai Konsultasi</Text>
        </View>
        <View style={styles.loginForm}>
          <Gap height={30} />
          <Input
            placeholder="email anda"
            label="Email Addres"
            value={form.email}
            onChangeText={(value) => setForm("email", value)}
          />
          <Gap height={17} />
          <Input
            placeholder="password anda"
            secureTextEntry
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
          />
          <Gap height={17} />
          <Link title="Forgot My Password" size={12} />
          <Gap height={40} />
          <Button
            type="secondary"
            text="secondary"
            title="Sign In"
            onPress={login}
          />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate("Register")}
          />
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
