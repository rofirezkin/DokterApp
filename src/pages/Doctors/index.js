import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { CategoryDoctor, Gap, Header, OnlineDoctors } from "../../components";
import { Fire } from "../../config";
import { colors, showError } from "../../utils";
const Doctors = ({ navigation, route }) => {
  const statusKonsultasi = route.params;
  const [listDoctor, setListDoctor] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getCategoryDoctor();
      callDoctorByCategory();
    }
    return () => {
      unmounted = true;
    };
  }, []);

  const callDoctorByCategory = () => {
    //docter umum
    //docter psikiater
    Fire.database()
      .ref("doctors/")
      .orderByChild("pembayaran")
      .equalTo("Gratis")
      .once("value")
      .then((res) => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((item) => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          setListDoctor(data);
        }
      });
  };

  const getCategoryDoctor = () => {
    Fire.database()
      .ref("category_doctor/")
      .once("value")
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setCategoryDoctor(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Pilih Dokter" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Gap height={27} />
          <View style={styles.chooseDoctor}>
            {categoryDoctor.map((item) => {
              const detailDoctor = {
                data: item,
                status: statusKonsultasi,
              };

              return (
                <CategoryDoctor
                  key={item.category}
                  onPress={() =>
                    navigation.navigate("ChooseDoctor", detailDoctor)
                  }
                  category={item.category}
                />
              );
            })}
          </View>
          <Gap height={27} />
          <Text style={styles.textKonsultasi}>Konsultasi Gratis</Text>
          <Gap height={12} />
          <View>
            {listDoctor.map((onlineDoctor) => {
              const detailDokter = {
                data: onlineDoctor,
                status: statusKonsultasi,
              };
              return (
                <OnlineDoctors
                  onPress={() =>
                    navigation.navigate("DoctorProfilePasien", detailDokter)
                  }
                  pembayaran={onlineDoctor.data.pembayaran}
                  rate={onlineDoctor.data.rate}
                  status={onlineDoctor.data.status}
                  key={onlineDoctor.id}
                  desc={onlineDoctor.data.category}
                  name={onlineDoctor.data.fullName}
                  experience={onlineDoctor.data.pengalaman}
                  photo={{ uri: onlineDoctor.data.photo }}
                />
              );
            })}
            <Gap height={27} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    paddingHorizontal: 18,
  },
  chooseDoctor: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textKonsultasi: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.default,
  },
});
