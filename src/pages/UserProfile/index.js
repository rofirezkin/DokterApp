import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gap, Header, List, Profile } from "../../components";

const UserProfile = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Header title="User Profile" />
      <Gap height={10} />
      <Profile />
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
        name="Help Center"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
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
