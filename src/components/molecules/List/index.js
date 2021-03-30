import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Account, HelpCenter, Next, Starts } from "../../../assets";

import { colors } from "../../../utils";

const List = ({ profile, name, desc, onPress, type, icon }) => {
  const Icon = () => {
    if (icon === " edit-profile") {
      return <Image style={styles.userProfile} source={Account} />;
    }
    if (icon === "rate") {
      return <Image style={styles.userProfile} source={Starts} />;
    }
    if (icon === "help") {
      return <Image style={styles.userProfile} source={HelpCenter} />;
    }
    return <Image style={styles.userProfile} source={Account} />;
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.duaKomponen}>
        {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text>{desc}</Text>
        </View>
      </View>
      {type === "next" && <Image source={Next} style={styles.userProfile} />}
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  duaKomponen: {
    flexDirection: "row",
  },
  container: {
    flexDirection: "row",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    justifyContent: "space-between",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.default,
  },
  userProfile: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
});
