import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  IconArtikel,
  IconArtikelActive,
  IconHome,
  IconHomeActive,
  IconMessages,
  IconMEssagesActive,
} from "../../../assets";
import { colors } from "../../../utils";

const TabItem = ({ title, active, onLongPress, onPress }) => {
  const Icon = () => {
    if (title === "Home") {
      return active ? (
        <Image source={IconHomeActive} />
      ) : (
        <Image source={IconHome} />
      );
    }
    if (title === "Messages") {
      return active ? (
        <Image source={IconMEssagesActive} />
      ) : (
        <Image source={IconMessages} />
      );
    }
    if (title === "Artikel") {
      return active ? (
        <Image source={IconArtikelActive} />
      ) : (
        <Image source={IconArtikel} />
      );
    }
    return <Image source={IconHome} />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: (active) => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontWeight: "600",
    marginTop: 4,
  }),
});
