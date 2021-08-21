import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { NullPhoto } from "../../assets";
import { Gap, Header, List, Profile } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const UserProfile = ({ navigation, route }) => {
  const Userprofile = route.params;
  const profile = Userprofile.profile;
  const UserApp = Userprofile.user;

  const [admin, setDataAdmin] = useState([]);
  useEffect(() => {
    let unmounted = false;
    Fire.database()
      .ref(`users/${profile.uid}/statusKonsultasi`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });

          if (!unmounted) {
            setDataAdmin(data);
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, [profile.uid]);

  const signOut1 = () => {
    Fire.auth()
      .signOut()
      .then((res) => {
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
  return (
    <View style={styles.page}>
      <Header title="User Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.category}
          photo={profile.photo}
        />
      )}

      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate("UpdateProfile")}
      />
      {UserApp && (
        <List
          name="Pembayaran"
          desc="Lihat Status Pembayaran anda"
          type="next"
          icon="help"
          onPress={() => navigation.navigate("StatusPembayaran", admin)}
        />
      )}
      <List
        name="Panduan Aplikasi"
        desc="Pemakaian Fitur"
        type="next"
        icon="help"
        onPress={() => navigation.navigate("PanduanAplikasi")}
      />
      <List
        name="Logout"
        desc="Labbst Update Yesterday"
        type="next"
        icon="signout"
        onPress={signOut1}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
});
