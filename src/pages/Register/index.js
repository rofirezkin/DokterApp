import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Header, Input, Button, Gap, Loading } from "../../components";
import { Fire } from "../../config";
import { colors, getData, storeData, useForm } from "../../utils";
import { showMessage, hideMessage } from "react-native-flash-message";
import { NullPhoto } from "../../assets";

const Register = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: "",
    category: "Dokter Umum",
    universitas: "",
    nomorSTR: "",
    gender: "pria",
    hospital: "",
    email: "",
    password: "",
    pengalaman: "",
  });
  console.log("nuilll poto", NullPhoto);
  const [description, setDescription] = useState("");
  const [itemCategory] = useState([
    {
      id: 1,
      label: "Dokter Umum",
      value: "Dokter Umum",
    },
    {
      id: 2,
      label: "Dokter Bedah",
      value: "Dokter Bedah",
    },
    {
      id: 3,
      label: "Dokter Obat",
      value: "Dokter Obat",
    },
    {
      id: 4,
      label: "Sepesialis Gizi",
      value: "Spesialis Gizi",
    },
  ]);

  const [itemGender] = useState([
    {
      id: 1,
      label: "Pria",
      value: "pria",
    },
    {
      id: 2,
      label: "Wanita",
      value: "wanita",
    },
  ]);

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
          hospital: form.hospital,
          gender: form.gender,
          shortDesc: description,
          rate: "0",
          pengalaman: form.pengalaman,
        };
        console.log("data shortdes", data);
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
              label="Kategori"
              value={form.category}
              onValueChange={(value) => setForm("category", value)}
              select
              selectItem={itemCategory}
            />
            <Gap height={20} />
            <Input
              label="Jenis Kelamin"
              value={form.gender}
              onValueChange={(value) => setForm("gender", value)}
              select
              selectItem={itemGender}
            />
            <Gap height={20} />
            <Input
              placeholder="rumah sakit tempat anda kerja"
              label="Nama Rumah Sakit"
              value={form.hospital}
              onChangeText={(value) => setForm("hospital", value)}
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
              placeholder="Misal : 2 Tahun"
              label="Pengalaman Bekerja"
              onChangeText={(value) => setForm("pengalaman", value)}
              value={form.pengalaman}
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
            <View>
              <Text style={styles.label}>Deskripsi Singkat</Text>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Tulis Deskripsi Singkat Anda disini"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(value) => setDescription(value)}
                value={description}
              />
            </View>
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
    padding: 30,
    paddingTop: 0,
    backgroundColor: colors.background,
    flex: 1,
  },
  textArea: {
    borderRadius: 8,
    height: 200,
    padding: 10,
    backgroundColor: "#F3F3F3",
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  label: { fontSize: 16, color: "#7D8797", marginBottom: 6 },
});
