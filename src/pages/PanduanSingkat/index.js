import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconWelcome, PanduanDua, PanduanSatu } from "../../assets";
import { Gap, ItemWelcome } from "../../components";
import { colors } from "../../utils";

const PanduanSingkat = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Gap height={20} />
      <Text style={styles.titleHeader}>Lihat Panduan Aplikasi</Text>

      <Gap height={20} />
      <Image source={PanduanSatu} style={styles.avatar} />
      <Gap height={20} />
      <Text style={styles.desc}>Selanjutnya</Text>
      <Gap height={20} />
      <Image source={PanduanDua} style={styles.avatar} />
      <Gap height={20} />
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "EmailVerification", params: "id" }],
            })
          }
          style={styles.buttonNext}
        >
          <Text style={styles.textNext}>Next</Text>
        </TouchableOpacity>
      </View>
      <Gap height={20} />
    </View>
  );
};

export default PanduanSingkat;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  avatar: {
    alignSelf: "center",
    width: 256,
    height: 208,
  },
  titleHeader: {
    fontFamily: "Nunito-Bold",
    fontSize: 17,
    textAlign: "center",
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
});
