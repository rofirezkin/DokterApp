import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header, Input, Button, Gap, Loading } from "../../components";
import { Fire } from "../../config";
import { colors, getData, storeData, useForm } from "../../utils";
import { showMessage, hideMessage } from "react-native-flash-message";

const Register = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: "",
    category: "",
    universitas: "",
    nomorSTR: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    // const data = {
    //   fullName: form.fullName,
    //   category: form.category,
    //   universitas: form.universitas,
    //   nomorSTR: form.nomorSTR,
    //   email: form.email,
    // };
    // navigation.navigate("UploadPhoto", data);

    console.log(form);

    setLoading(true);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        setLoading(false);
        setForm("reset");
        const data = {
          fullName: form.fullName,
          category: form.category,
          universitas: form.universitas,
          nomorSTR: form.nomorSTR,
          email: form.email,
          uid: success.user.uid,
        };
        Fire.database()
          .ref("doctors/" + success.user.uid + "/")
          .set(data);

        storeData("user", data);
        navigation.navigate("UploadPhoto", data);
        console.log("registes sukses", success);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
        console.log("error", error);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header
          title="Register"
          onPress={() => navigation.navigate("GetStarted")}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Gap height={20} />
            <Input
              placeholder="nama lengkap anda"
              label="Full Name"
              onChangeText={(value) => setForm("fullName", value)}
              value={form.fullName}
            />
            <Gap height={20} />
            <Input
              placeholder="category"
              label="Kategori Dokter"
              onChangeText={(value) => setForm("category", value)}
              value={form.category}
            />
            <Gap height={20} />
            <Input
              placeholder="pendidikan terakhir anda"
              label="Universitas"
              onChangeText={(value) => setForm("universitas", value)}
              value={form.universitas}
            />
            <Gap height={20} />
            <Input
              placeholder="nomor STR anda"
              label="Nomor STR"
              onChangeText={(value) => setForm("nomorSTR", value)}
              value={form.nomorSTR}
            />
            <Gap height={20} />
            <Input
              placeholder="email anda"
              label="Email"
              onChangeText={(value) => setForm("email", value)}
              value={form.email}
            />
            <Gap height={20} />
            <Input
              placeholder="password anda"
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
      {loading && <Loading />}
    </>
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
