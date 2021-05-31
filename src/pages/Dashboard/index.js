import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Category1, Category2, Category3, NullPhoto } from "../../assets";

import {
  Category,
  Gap,
  HealthInfo,
  HomeProfile,
  RatedDoctor,
} from "../../components";
import { colors, getData, showError } from "../../utils";
import { Fire } from "../../config";
const Dashboard = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState({
    photo: NullPhoto,
    fullName: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
    getNews();
    getTopRatedDoctors();
  }, []);

  const getTopRatedDoctors = () => {
    setLoading(true);
    Fire.database()
      .ref("doctors/")
      .orderByChild("rate")
      .limitToLast(3)
      .once("value")
      .then((res) => {
        console.log("top rated Doctors", res.val());
        if (res.val()) {
          setLoading(false);
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log("data hasil parse", data);
          setDoctors(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  getNews = () => {
    Fire.database()
      .ref("news/")
      .once("value")
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setNews(filterData);
          console.log("data news", filterData);
        }
      });
  };

  const getUserData = () => {
    getData("user").then((res) => {
      console.log("data untuk ddaSHBOAR ", res);
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;
      setProfile(res);
    });
  };

  const [images] = useState([
    {
      id: 1,
      image: Category1,
    },
    {
      id: 2,
      image: Category2,
    },
    {
      id: 3,
      image: Category3,
    },
  ]);
  return (
    <ScrollView style={styles.pages} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.wrapperSection}>
          <HomeProfile
            profile={profile}
            onPress={() => navigation.navigate("UserProfile", profile)}
          />
          <Text
            style={styles.welcome}
          >{`Selamat Pagi ${profile.fullName}`}</Text>
          <Text style={styles.welcome2}>
            Ayo Lakukan konsultasi Dengan Pasien Anda
          </Text>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal>
              <View style={styles.category}>
                <Gap width={18} />
                {images.map((image) => {
                  return <Category key={image.id} image={image.image} />;
                })}
                <Gap width={8} />
              </View>
            </ScrollView>
          </View>
          <Gap height={25} />
          <Text style={styles.TopDoct}>Top Doctors</Text>
          <Gap height={8} />
          <View style={styles.wrapperScroll}>
            {loading && <Text>Loading</Text>}
            <ScrollView horizontal>
              <View style={styles.topDokter}>
                <Gap width={18} />
                {doctors.map((doctor) => {
                  return (
                    <RatedDoctor
                      key={doctor.data.uid}
                      name={doctor.data.fullName}
                      desc={doctor.data.category}
                      avatar={{ uri: doctor.data.photo }}
                      onPress={() =>
                        navigation.navigate("DoctorProfile", doctor)
                      }
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        <Gap height={20} />
        <Text style={styles.TopHealth}>Health Information</Text>
        {news.map((item) => {
          return (
            <HealthInfo
              key={item.id}
              title={item.title}
              body={item.body}
              image={item.image}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrapperScroll: {
    marginHorizontal: -18,
  },
  wrapperSection: {
    paddingHorizontal: 18,
  },
  pages: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: "#F3FFFE",
  },
  welcome: { fontSize: 15, color: colors.text.secondary, marginTop: 20 },
  welcome2: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 7,
  },
  category: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  topDokter: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  TopDoct: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.default,
  },
  TopHealth: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.default,
    marginHorizontal: 18,
  },
});
