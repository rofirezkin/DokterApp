import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Category1,
  Category2,
  Category3,
  NullPhoto,
  DoctorFitur,
} from "../../assets";

import {
  Category,
  FiturUser,
  Gap,
  HealthInfo,
  HomeProfile,
  Link,
  RatedDoctor,
} from "../../components";
import { colors, getData, showError } from "../../utils";
import { Fire } from "../../config";

const DashboardPasien = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState({
    photo: NullPhoto,
    fullName: "",
    category: "",
  });
  const [alatMedical, setAlatMedical] = useState(0);
  const [statusKonsultasi, setStatusKonsultasi] = useState("");
  useEffect(() => {
    let unmounted = false;
    Fire.database()
      .ref(`users/${profile.uid}/alatMedical/`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (!unmounted) {
            setAlatMedical(data);
          }
        }
      });
    //timee awal get sdata
    Fire.database()
      .ref(`users/${profile.uid}/statusKonsultasi`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setLoading(false);
          const oldData = snapshot.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          // dapet data
          setStatusKonsultasi(data);
        }
      });
    if (!unmounted) {
      getUserData();
      getNews();
      getTopRatedDoctors();
    }
    return () => {
      unmounted = true;
    };
  }, [profile.uid]);

  const getTopRatedDoctors = () => {
    setLoading(true);
    Fire.database()
      .ref("doctors/")
      .orderByChild("rate/ratePersentasi")
      .limitToLast(3)
      .once("value")
      .then((res) => {
        setLoading(false);
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });

          setDoctors(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getNews = () => {
    setLoadingInfo(true);
    Fire.database()
      .ref("news/")
      .orderByChild("uid")
      .limitToLast(3)
      .once("value", (snapshot) => {
        setLoadingInfo(false);
        const oldData = snapshot.val();
        const data = [];
        Object.keys(oldData).map((key) => {
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        data.reverse();
        setNews(data);
      });
  };

  const getUserData = () => {
    getData("user").then((res) => {
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
  const dataProfile = {
    profile: profile,
    user: "pasien",
  };
  return (
    <View style={styles.pages}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperSection}>
          <HomeProfile
            profile={profile}
            onPress={() => navigation.navigate("UserProfile", dataProfile)}
          />

          <Text
            style={styles.welcome}
          >{`Selamat Datang ${profile.fullName}`}</Text>
          <Text style={styles.welcome2}>
            Ayo Lakukan konsultasi Dengan Dokter Terbaik
          </Text>

          {alatMedical !== 0 && (
            <TouchableOpacity
              onPress={() => navigation.replace("RealtimeData", alatMedical)}
            >
              <View style={{ backgroundColor: "yellow", paddingVertical: 7 }}>
                <Text style={{ textAlign: "center" }}>
                  Anda Masih terhubung dengan Alat Medical checkup
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          <View style={styles.fitur}>
            <FiturUser
              img={DoctorFitur}
              title="Konsultasi Dengan Dokter"
              onPress={() => navigation.navigate("Doctors", statusKonsultasi)}
            />
            <FiturUser
              img={DoctorFitur}
              title="Lihat Body Mass Index Anda"
              onPress={() => navigation.navigate("BodyMassIndex", profile.uid)}
            />
          </View>
          <Gap height={25} />
          <Text style={styles.TopDoct}>Top Rated Doctors</Text>
          <Gap height={8} />
          <View style={styles.wrapperScroll}>
            {loading && <Text style={styles.loading}>Loading</Text>}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.topDokter}>
                <Gap width={18} />
                {doctors.map((doctor) => {
                  const detailUidWithDoctor = {
                    data: doctor,
                    status: statusKonsultasi,
                  };
                  const shortDesc = doctor.data.fullName;
                  shortDesc.toString();
                  let fixedDesc = "";
                  if (shortDesc.length > 20) {
                    fixedDesc = shortDesc.substring(0, 18) + "...";
                  } else {
                    fixedDesc = shortDesc;
                  }
                  return (
                    <RatedDoctor
                      experienced={doctor.data.pengalaman}
                      rate={doctor.data.rate.ratePersentasi}
                      key={doctor.data.uid}
                      name={fixedDesc}
                      desc={doctor.data.category}
                      avatar={doctor.data.photo}
                      onPress={() =>
                        navigation.navigate(
                          "DoctorProfilePasien",
                          detailUidWithDoctor
                        )
                      }
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        <Gap height={20} />
        <Text style={styles.TopHealth}>Artikel Terbaru</Text>
        {loadingInfo && <Text style={styles.loading}>Loading</Text>}
        {news.map((item) => {
          const data = {
            dataArtikel: item.data,
            edit: false,
          };
          return (
            <HealthInfo
              onPress={() => navigation.navigate("ArtikelPage", data)}
              key={item.id}
              title={item.data.title}
              body={item.data.body}
              image={item.data.image}
            />
          );
        })}
        <View style={styles.seeMore}>
          <Link
            onPress={() => navigation.navigate("AllArtikel")}
            title="Lihat Selengkapnya"
            align="right"
            size={16}
          />
        </View>
        <View>
          <Text
            style={{ textAlign: "center", marginTop: 10, color: colors.border }}
          >
            v1.0.2
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardPasien;

const styles = StyleSheet.create({
  wrapperScroll: {
    marginHorizontal: -18,
  },
  wrapperSection: {
    paddingHorizontal: 18,
  },
  pages: {
    paddingTop: 30,
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  welcome: {
    fontSize: 15,
    fontFamily: "Nunito-Bold",
    color: colors.text.secondary,
    marginTop: 20,
  },
  welcome2: {
    fontSize: 19,
    fontFamily: "Nunito-Bold",
    color: colors.text.default,
    marginTop: 7,
  },
  loading: {
    textAlign: "center",
    color: colors.inputBorder,
  },

  fitur: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  seeMore: {
    textAlign: "right",
    color: colors.text.secondary,
    marginRight: 18,
    marginTop: 10,
  },
  topDokter: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  TopDoct: {
    fontSize: 17,
    fontFamily: "Nunito-Bold",
    color: colors.text.default,
  },
  TopHealth: {
    fontSize: 19,
    fontFamily: "Nunito-Bold",
    color: colors.text.default,
    marginHorizontal: 18,
  },
});
