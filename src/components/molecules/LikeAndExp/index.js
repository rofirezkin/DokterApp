import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { ExpProfile, LikeProfile } from "../../../assets";
import { colors } from "../../../utils";

const LikeAndExp = ({ rate, experienced }) => {
  return (
    <View style={styles.container}>
      <View style={styles.spaceDesc}>
        <View style={styles.box}>
          <Text style={styles.textTitle}>Pengalaman</Text>
          <Image source={ExpProfile} style={styles.avatar} />
          <Text style={styles.textTitle}>{experienced}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.textTitle}>Menyukai</Text>
          <Image source={LikeProfile} style={styles.avatar} />
          <Text style={styles.textTitle}>{`${rate}%`}</Text>
        </View>
      </View>
    </View>
  );
};

export default LikeAndExp;

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: colors.white,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  avatar: {
    width: 25,
    height: 25,
    alignSelf: "center",
  },
  box: {
    width: 90,
  },
  spaceDesc: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  textTitle: {
    marginBottom: 10,
    textAlign: "center",
  },
});
