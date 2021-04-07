import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Gap, Header, Input, Profile } from "../../components";
import { Fire } from "../../config";
import { colors, getData, storeData } from "../../utils";
import ImagePicker from "react-native-image-picker";
import { NullPhoto } from "../../assets";

const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    category: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(NullPhoto);
  const [phtoForDB, setPhotoForDB] = useState("");

  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      setPhoto({ uri: res.photo });
      setProfile(data);
    });
  });

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: "Password Kurang dari 6 Karakter",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        updatePassword();
        updateProfileData();
        navigation.replace("MainApp");
      }
    } else {
      updateProfileData();
      navigation.replace("MainApp");
    }
  };
  const updatePassword = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updatePassword(password).catch((err) => {
          showMessage({
            message: err.message,
            type: "default",
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = setPhotoForDB;

    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log("success");
        storeData("user", data);
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

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      { quality: 0.5, maxWidth: 200, maxHeight: 200 },
      (response) => {
        console.log("poto", response);
        if (response.didCancel || response.error) {
          showMessage({
            message: "opps, sepertinya anda tidak memilih fotonya?",
            type: "default",
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          console.log("response getImage", response);
          const source = { uri: response.uri };
          setPhotoForDB(`data:${response.type};base64, ${response.data}`);

          setPhoto(source);
        }
      }
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Gap height={24} />
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={23} />
          <Input
            value={profile.fullName}
            label="Full Name"
            onChangeText={(value) => changeText("fullName", value)}
          />
          <Gap height={24} />
          <Input
            value={profile.category}
            label="Category"
            onChangeText={(value) => changeText("category", value)}
          />
          <Gap height={24} />
          <Input
            value={profile.email}
            label="Email"
            disable
            onChangeText={(value) => changeText("email", value)}
          />
          <Gap height={24} />
          <Input
            secureTextEntry
            value={password}
            label="Password"
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={24} />
          <Button
            title="Save Profile"
            type="secondary"
            text="secondary"
            onPress={update}
          />
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
