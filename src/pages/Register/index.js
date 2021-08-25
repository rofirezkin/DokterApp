import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Header, Input, Button, Gap, Loading } from "../../components";
import { Fire } from "../../config";
import { colors, getData, storeData, useForm } from "../../utils";
import { showMessage, hideMessage } from "react-native-flash-message";

const Register = ({ navigation, route }) => {
  const role = route.params;
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
    pembayaran: "Gratis",
  });

  const [form1, setForm1] = useForm({
    fullName: "",
    category: "",
    email: "",
    password: "",
    gender: "pria",
  });

  const [isSecureEntry, setIsSecureEntry] = useState(true);
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
      label: "Dokter Anak",
      value: "Dokter Anak",
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
  const [itemPembayaran] = useState([
    {
      id: 1,
      label: "Gratis",
      value: "Gratis",
    },
    {
      id: 2,
      label: "Berbayar",
      value: "Berbayar",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const onContinuePasien = () => {
    // const dataKonsul = {
    //   status: 'selesai',
    //   uidDokter: '',
    // };

    if (form1.fullName !== "" && form1.category !== "") {
      setLoading(true);
      Fire.auth()
        .createUserWithEmailAndPassword(form1.email, form1.password)
        .then((success) => {
          setLoading(false);
          setForm("reset");
          const data = {
            fullName: form1.fullName,
            category: form1.category,
            email: form1.email,
            uid: success.user.uid,
            gender: form1.gender,
            role: role,
          };
          // send verification mail.
          success.user.sendEmailVerification();

          Fire.database()
            .ref("users/" + success.user.uid + "/")
            .set(data);

          storeData("user", data);

          navigation.reset({
            index: 0,
            routes: [{ name: "UploadPhoto", params: data }],
          });
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
        });
    } else {
      return showMessage({
        message: "Sepertinya Anda kurfang Input biodata",
        type: "default",
        backgroundColor: colors.error,
        color: colors.white,
      });
    }
  };

  const onContinue = () => {
    if (
      form.fullName !== "" &&
      form.universitas !== "" &&
      form.nomorSTR !== "" &&
      form.hospital &&
      form.pengalaman !== "" &&
      description !== ""
    ) {
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
            pembayaran: form.pembayaran,
            role: role,
          };

          // send verification mail.
          success.user.sendEmailVerification();
          Fire.database()
            .ref("doctors/" + success.user.uid + "/")
            .set(data);

          storeData("user", data);
          navigation.reset({
            index: 0,
            routes: [{ name: "UploadPhoto", params: data }],
          });
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
        });
    } else {
      return showMessage({
        message: "Sepertinya Anda kurang Input biodata",
        type: "default",
        backgroundColor: colors.error,
        color: colors.white,
      });
    }
  };
  return (
    <>
      <View style={styles.page}>
        <Header title="Register" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {role === "users" ? (
              <View>
                <Gap height={20} />
                <Input
                  placeholder="yourfullname"
                  label="Full Name"
                  onChangeText={(value) => setForm1("fullName", value)}
                  value={form1.fullName}
                />
                <Gap height={20} />
                <Input
                  placeholder="yourprofession"
                  label="Profession"
                  onChangeText={(value) => setForm1("category", value)}
                  value={form1.category}
                />
                <Gap height={20} />
                <Input
                  label="Jenis Kelamin"
                  value={form1.gender}
                  onValueChange={(value) => setForm1("gender", value)}
                  select
                  selectItem={itemGender}
                />
                <Gap height={20} />
                <Input
                  placeholder="youremail@gmail.com"
                  label="Email"
                  onChangeText={(value) => setForm1("email", value)}
                  value={form1.email}
                />
                <Gap height={20} />
                <Input
                  iconPosition="right"
                  placeholder="yourpassword"
                  secureTextEntry={isSecureEntry}
                  label="Password"
                  icon={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry((prev) => !prev);
                      }}
                    >
                      <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                  }
                  onChangeText={(value) => setForm1("password", value)}
                  value={form1.password}
                />
                <Gap height={20} />
                <Button
                  type="secondary"
                  title="Continue"
                  text="secondary"
                  onPress={onContinuePasien}
                />
              </View>
            ) : (
              <View>
                <Gap height={20} />
                <Input
                  placeholder="nama lengkap anda"
                  label="Nama Lengkap dan Gelar"
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
                  label="Pembayaran Dokter"
                  value={form.pembayaran}
                  onValueChange={(value) => setForm("pembayaran", value)}
                  select
                  selectItem={itemPembayaran}
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
                  iconPosition="right"
                  placeholder="Buat Password"
                  secureTextEntry={isSecureEntry}
                  label="Buat Password"
                  icon={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry((prev) => !prev);
                      }}
                    >
                      <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                  }
                  onChangeText={(value) => setForm("password", value)}
                  value={form.password}
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
            )}
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
