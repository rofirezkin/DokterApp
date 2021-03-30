import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header, Input, Button, Gap } from "../../components";
import { Fire } from "../../config";
import { colors, useForm } from "../../utils";

const Register = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: "",
    category: "",
    universitas: "",
    nomorSTR: "",
    email: "",
    password: "",
  });

  const onContinue = () => {
    console.log(form);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        console.log("registes sukese", success);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("eror register", errorMessage);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title="Register"
        onPress={() => navigation.navigate("GetStarted")}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Gap height={20} />
          <Input
            label="Full Name"
            onChangeText={(value) => setForm("fullName", value)}
            value={form.fullName}
          />
          <Gap height={20} />
          <Input
            label="Kategori Dokter"
            onChangeText={(value) => setForm("category", value)}
            value={form.category}
          />
          <Gap height={20} />
          <Input
            label="Universitas"
            onChangeText={(value) => setForm("universitas", value)}
            value={form.universitas}
          />
          <Gap height={20} />
          <Input
            label="Nomor STR"
            onChangeText={(value) => setForm("nomorSTR", value)}
            value={form.nomorSTR}
          />
          <Gap height={20} />
          <Input
            label="Email"
            onChangeText={(value) => setForm("email", value)}
            value={form.email}
          />
          <Gap height={20} />
          <Input
            label="Password"
            onChangeText={(value) => setForm("password", value)}
            value={form.password}
            secureTextEntry
          />
          <Gap height={20} />
          <Button
            type="secondary"
            title="Continue"
            text="secondary"
            onPress={onContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.background, flex: 1 },
  content: {
    padding: 35,
    paddingTop: 0,
    backgroundColor: colors.background,
    flex: 1,
  },
});
