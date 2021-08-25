import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Gap, Header, Input, Profile } from "../../components";
import { Fire } from "../../config";
import { colors, getData, storeData } from "../../utils";
import ImagePicker from "react-native-image-picker";
import { NullPhoto } from "../../assets";
import { useDispatch } from "react-redux";

const UpdateProfile = ({ navigation, route }) => {
  const role = route.params;
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    fullName: "",
    category: "",
    email: "",
    photoForDB: "",
  });
  const [password, setPassword] = useState("");
  const [itemCategory] = useState([
    {
      id: 1,
      label: "Dokter Umum",
      value: "Dokter Umum",
    },
    {
      id: 2,
      label: "Dokter Bedah",
      value: "Dokter Bedah",
    },
    {
      id: 3,
      label: "Dokter Obat",
      value: "Dokter Obat",
    },
    {
      id: 4,
      label: "Sepesialis Gizi",
      value: "Spesialis Gizi",
    },
  ]);

  const [photo, setPhoto] = useState(NullPhoto);
  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : NullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;
      setProfile(data);
      setPhoto(tempPhoto);
    });
  }, []);

  const update = () => {
    dispatch({ type: "SET_LOADING", value: true });

    if (password.length > 0) {
      if (password.length < 6) {
        dispatch({ type: "SET_LOADING", value: false });
        showMessage({
          message: "Password Kurang dari 6 Karakter",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };
  const updatePassword = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updatePassword(password).catch((err) => {
          dispatch({ type: "SET_LOADING", value: false });
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
    data.photo = profile.photoForDB;
    delete data.photoForDB;
    Fire.database()
      .ref(`${role}/${profile.uid}/`)
      .update(data)
      .then(() => {
        if (role === "doctors") {
          storeData("user", data);
          dispatch({ type: "SET_LOADING", value: false });
          navigation.reset({
            index: 0,
            routes: [{ name: "MainApp" }],
          });
        } else {
          storeData("user", data);
          dispatch({ type: "SET_LOADING", value: false });
          navigation.reset({
            index: 0,
            routes: [{ name: "MainAppPasien" }],
          });
        }
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADING", value: false });
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
        if (response.didCancel || response.error) {
          showMessage({
            message: "opps, sepertinya anda tidak memilih fotonya?",
            type: "default",
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          const source = { uri: response.uri };
          setProfile({
            ...profile,
            photoForDB: `data:${response.type};base64, ${response.data}`,
          });
          setPhoto(source);
        }
      }
    );
  };

  return (
    <View style={styles.page}>
      <Header
        title="Edit Profile"
        onPress={() => navigation.navigate("UserProfile")}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {role === "doctors" ? (
            <View>
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
                label="Kategori"
                value={profile.category}
                onValueChange={(value) => changeText("category", value)}
                select
                selectItem={itemCategory}
              />
              <Gap height={24} />
              <Input
                value={profile.hospital}
                label="Nama Rumah Sakit"
                onChangeText={(value) => changeText("hospital", value)}
              />
              <Gap height={24} />
              <Input
                value={profile.universitas}
                label="Pendidikan Terakhir"
                onChangeText={(value) => changeText("universitas", value)}
              />
              <Gap height={24} />
              <Input
                value={profile.email}
                label="Email"
                disable
                onChangeText={(value) => changeText("email", value)}
              />

              <Gap height={24} />
              <Button
                title="Save Profile"
                type="secondary"
                text="secondary"
                onPress={update}
              />
            </View>
          ) : (
            <View>
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

              <Gap height={24} />
              <Button
                title="Save Profile"
                type="secondary"
                text="secondary"
                onPress={update}
              />
            </View>
          )}
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
