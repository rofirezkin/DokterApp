import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Arrow } from "../../../assets";
import { colors } from "../../../utils";
import { Gap } from "../../atoms";

const Header = ({ onPress, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={Arrow} width={20} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <Gap width={27} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 25,
    paddingHorizontal: 17,
    flexDirection: "row",
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
  },
  text: { textAlign: "center", flex: 1, fontSize: 20, color: colors.white },
});
