import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

import { Button, Gap, Input, Link } from "../../components/atoms";
import { Fire } from "../../config";
import { colors, storeData, useForm } from "../../utils";
import Logo from "./logoNew.png";
const Login = ({ navigation, route }) => {
  const role = route.params;
  const [form, setForm] = useForm({ email: "", password: "" });
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const dispatch = useDispatch();
  const login = () => {
    dispatch({ type: "SET_LOADING", value: true });
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        if (res.user.emailVerified === true) {
          Fire.database()
            .ref(`${role}/${res.user.uid}/`)
            .once("value")
            .then((resDB) => {
              if (resDB.val()) {
                if (role === "doctors") {
                  const dataKirim = resDB.val();
                  const kirimStorage = {
                    category: dataKirim.category,
                    email: dataKirim.email,
                    fullName: dataKirim.fullName,
                    gender: dataKirim.gender,
                    photo: dataKirim.photo,
                    uid: dataKirim.uid,
                    hospital: dataKirim.hospital,
                    nomorSTR: dataKirim.nomorSTR,
                    pembayaran: dataKirim.pembayaran,
                    pengalaman: dataKirim.pengalaman,
                    shortDesc: dataKirim.shortDesc,
                    universitas: dataKirim.universitas,
                  };

                  storeData("user", kirimStorage);
                  navigation.replace("MainApp");
                  dispatch({ type: "SET_LOADING", value: false });
                } else if (role === "users") {
                  const dataKirim = resDB.val();
                  const kirimStorage = {
                    category: dataKirim.category,
                    email: dataKirim.email,
                    fullName: dataKirim.fullName,
                    gender: dataKirim.gender,
                    photo: dataKirim.photo,
                    uid: dataKirim.uid,
                  };

                  storeData("user", kirimStorage);
                  navigation.replace("MainAppPasien");
                  dispatch({ type: "SET_LOADING", value: false });
                } else if (role === "admin") {
                  navigation.replace("DashboardAdmin");
                  dispatch({ type: "SET_LOADING", value: false });
                } else {
                  Fire.auth().signOut();
                  dispatch({ type: "SET_LOADING", value: false });
                  showMessage({
                    message: "sepertinya anda salah memasukan akun",
                    type: "default",
                    backgroundColor: colors.error,
                    color: colors.white,
                  });
                }
              } else {
                Fire.auth().signOut();
                dispatch({ type: "SET_LOADING", value: false });
                showMessage({
                  message: "sepertinya anda salah memasukan akun",
                  type: "default",
                  backgroundColor: colors.error,
                  color: colors.white,
                });
              }
            });
        } else {
          dispatch({ type: "SET_LOADING", value: false });
          navigation.replace("EmailVerification");
        }
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADING", value: false });
        showMessage({
          message: err.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
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
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
          />

          <Gap height={40} />
          <Button
            type="secondary"
            text="secondary"
            title="Sign In"
            onPress={login}
          />
          <Gap height={30} />
          {/* <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate("RoleUser", "Register")}
          /> */}
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
