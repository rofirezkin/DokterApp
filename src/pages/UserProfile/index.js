import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { NullPhoto } from "../../assets";
import { Gap, Header, List, Profile } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const UserProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    category: "",
    photo: NullPhoto,
  });
  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      data.photo = { uri: res.photo };
      setProfile(data);
    });
  }, []);

  const signOut = () => {
    Fire.auth()
      .signOut()
      .then((res) => {
        console.log("succes sign out");
        navigation.replace("GetStarted");
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
      <Header title="User Profile" />
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
      <List
        name="Give Us Rate"
        desc="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Logout"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPres={signOut}
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
