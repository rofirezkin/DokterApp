import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DummyDoctor1, RemovePhoto } from "../../../assets";
import { colors } from "../../../utils";

const Profile = ({ name, desc, profile }) => {
  const PushProfileDoctor = () => {
    if (profile) {
      return (
        <View style={styles.container}>
          <View>
            <Image source={DummyDoctor1} style={styles.avatar} />
          </View>
          {name && (
            <View>
              <Text style={styles.name(profile)}>{name}</Text>
              <Text style={styles.profession(profile)}>{desc}</Text>
            </View>
          )}
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.borderProfile}>
          <Image source={DummyDoctor1} style={styles.avatar} />
          <Image source={RemovePhoto} style={styles.removePhoto} />
        </View>
        {name && (
          <View>
            <Text style={styles.name(profile)}>{name}</Text>
            <Text style={styles.profession(profile)}>{desc}</Text>
          </View>
        )}
      </View>
    );
  };
  return (
    <View>
      <PushProfileDoctor />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  avatar: { width: 110, height: 110, borderRadius: 110 / 2 },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.borderNews,
    justifyContent: "center",
    alignItems: "center",
  },
  name: (profile) => ({
    fontSize: 20,
    fontWeight: "600",
    color: profile ? colors.white : colors.text.default,
    marginTop: 16,
  }),
  profession: (profile) => ({
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: profile ? colors.white : colors.text.secondary,
    marginTop: 2,
  }),
  removePhoto: { position: "absolute", right: 8, bottom: 8 },
});
