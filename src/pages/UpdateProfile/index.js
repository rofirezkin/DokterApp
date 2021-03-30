import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Gap, Header, Input, Profile } from "../../components";
import { colors } from "../../utils";

const UpdateProfile = () => {
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Gap height={24} />
          <Profile />
          <Gap height={23} />
          <Input label="Full Name" />
          <Gap height={24} />
          <Input label="Category" />
          <Gap height={24} />
          <Input label="Email" />
          <Gap height={24} />
          <Input label="Password" />
          <Gap height={24} />
          <Button title="Save Profile" type="secondary" text="secondary" />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.page,
    flex: 1,
  },
  container: {
    padding: 40,
    paddingTop: 0,
  },
});
