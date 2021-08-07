import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EmailIcon } from "../../assets";
import { Gap } from "../../components";
import { Fire } from "../../config";
import { colors } from "../../utils";

import { showMessage } from "react-native-flash-message";

const EmailVerification = ({ navigation, route }) => {
  const loginVerification = route.params;
  console.log("email", loginVerification);

  const Logout = () => {
    Fire.auth()
      .signOut()
      .then((res) => {
        console.log("succes sign out", res);
        navigation.reset({
          index: 0,
          routes: [{ name: "GetStarted" }],
        });
      })
      .catch((err) => {
        showMessage({
          message: err.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };
  const SendVerification = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user.sendEmailVerification();
        showMessage({
          message: "Pengiriman Berhasil",
          type: "default",
          backgroundColor: "#27DE3A",
          color: colors.white,
        });
      }
    });
  };
  return (
    <View style={styles.page}>
      <Gap height={20} />
      <Text style={styles.titleHeader}>
        Link Verifikasi Terkirim Ke Email anda
      </Text>
      <Text style={styles.desc}>
        silahkan lakukan Verifikasi di Email anddda untuk memulai konsultasi
      </Text>
      <Gap height={20} />
      <View style={styles.boxHeader}>
        <Image source={EmailIcon} style={styles.avatarEmail} />
      </View>
      <Gap height={20} />
      <Text style={styles.desc}>Tidak Menerima Verifikasi?</Text>
      <Text style={styles.desc}>Kirim Ulang Verifikasi</Text>
      <Gap height={10} />
      <TouchableOpacity onPress={SendVerification} style={styles.buttonNext}>
        <Text style={styles.textNext}>Kirim Ulang Verifikasi</Text>
      </TouchableOpacity>
      <Gap height={20} />
      <TouchableOpacity onPress={Logout} style={styles.buttonNext}>
        <Text style={styles.textNext}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  boxHeader: {
    alignSelf: "center",
  },
  titleHeader: {
    fontFamily: "Nunito-Bold",
    fontSize: 17,
    textAlign: "center",
  },
  avatarEmail: {
    width: 231,
    height: 260,
  },
  desc: {
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    fontSize: 14,
  },
  componentItem: {
    marginHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-end",
  },
  buttonNext: {
    backgroundColor: colors.primary,
    marginHorizontal: 40,
    padding: 15,
    borderRadius: 15 / 2,
  },
  textNext: {
    color: colors.white,
    textAlign: "center",
  },
});
