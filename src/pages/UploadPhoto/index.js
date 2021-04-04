import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AddPhoto, NullPhoto, RemovePhoto } from "../../assets";
import { Button, Gap, Header, Link } from "../../components";
import { colors } from "../../utils";

const UploadPhoto = ({ navigation }) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.avatarWrapper}>
            <Image source={NullPhoto} style={styles.avatar} />
            {hasPhoto && <Image source={RemovePhoto} style={styles.AddPhoto} />}
            {!hasPhoto && <Image source={AddPhoto} style={styles.AddPhoto} />}
          </View>
          <Text style={styles.name}>Rina Alvira</Text>
          <Text style={styles.profession}>Dokter Umum</Text>
        </View>
        <View>
          <Button
            disable
            text="secondary"
            type="secondary"
            title="Upload and Continue"
            onPress={() => navigation.replace("MainApp")}
          />
          <Gap height={30} />
          <Link title="Skip for this" align="center" size={16} />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    flex: 1,
    justifyContent: "space-between",
  },
  profile: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  AddPhoto: { position: "absolute", bottom: 8, right: 6 },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  profession: {
    fontSize: 18,
    textAlign: "center",
    color: colors.text.secondary,
  },
});
