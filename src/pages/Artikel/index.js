import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FotoBlog, NullPhoto } from "../../assets";
import { Gap, HealthInfo, UpdateStatus } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const Artikel = ({ navigation }) => {
  const [profile, setProfile] = useState([]);
  const [artikel, setArtikel] = useState([]);
  useEffect(() => {
    let unmounted = false;

    getUserData();

    return () => {
      unmounted = true;
    };
  }, [profile.uid]);

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;
      setProfile(res);
    });
    Fire.database()
      .ref(`doctors/${profile.uid}/artikel/`)
      .on("value", (snapshot) => {
        const oldData = snapshot.val();
        if (snapshot.val()) {
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setArtikel(data);
        }
      });
  };
  return (
    <View style={styles.page}>
      <ScrollView>
        <Text style={styles.title}>Artikel Anda</Text>
        <View style={styles.wrapperSection}>
          <View style={styles.centerArtikel}>
            <Image source={FotoBlog} style={styles.image} />
          </View>
          <Gap height={30} />
          <UpdateStatus
            photo={profile.photo}
            onPress={() => navigation.navigate("UpdateStatus")}
          />
          <Gap height={25} />
          <Text style={styles.titleArtikel}>Artikel Yang anda dibuat</Text>
        </View>
        {artikel.map((item) => {
          //onlongpress
          const handlerLongClick = () => {
            //handler for Long Click
            Alert.alert(
              "Hapus Pesan",
              "Apakah kamu akan Hapus Artikel Tersebut ?",
              [
                {
                  text: "YA",
                  onPress: handlerClick,
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
                // onDismiss: () =>
                //   Alert.alert(
                //     'This alert was dismissed by tapping outside of the alert dialog.',
                //   ),
              }
            );
          };

          const handlerClick = () => {
            Fire.database()
              .ref(`doctors/${profile.uid}/artikel/${item.id}`)
              .remove();
            Fire.database().ref(`news/${item.id}`).remove();

            //handler for Long Click
          };
          //endonlongpress
          const data = {
            dataArtikel: item.data,
            edit: true,
          };
          return (
            <HealthInfo
              onPress={() => navigation.navigate("ArtikelPage", data)}
              key={item.id}
              title={item.data.title}
              body={item.data.body}
              image={item.data.image}
              onLongPress={handlerLongClick}
            />
          );
        })}
        <Gap height={50} />
      </ScrollView>
    </View>
  );
};

export default Artikel;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 30,
    textAlign: "center",
  },
  wrapperSection: {
    paddingHorizontal: 18,
  },
  image: {
    width: 320,
    height: 134,
  },
  centerArtikel: {
    marginTop: 19,
    alignItems: "center",
  },
  titleArtikel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text.default,
  },
});
