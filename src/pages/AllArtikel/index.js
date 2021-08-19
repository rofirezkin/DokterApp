import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Gap, Header, HealthInfo } from "../../components";
import { Fire } from "../../config";
import { colors } from "../../utils";

const AllArtikel = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getNews();
    }
    return () => {
      unmounted = true;
    };
  }, []);
  const getNews = () => {
    setLoadingInfo(true);
    Fire.database()
      .ref("news/")
      .once("value", (snapshot) => {
        const oldData = snapshot.val();
        const data = [];
        Object.keys(oldData).map((key) => {
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        data.reverse();
        setLoadingInfo(false);
        setNews(data);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Halaman Artikel" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={10} />
        {loadingInfo && <Text style={styles.loading}>Loading.....</Text>}
        <View style={styles.container}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default AllArtikel;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    marginTop: 20,
  },
  TopHealth: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.default,
    marginHorizontal: 18,
  },
  loading: {
    textAlign: "center",
  },
});
