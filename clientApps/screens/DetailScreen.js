import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, StatusBar, FlatList } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import useFetch from "../hooks/useFetch";
import YouTube from "react-native-youtube";
import CreditCast from "../components/CreditCast";
import CardMovieHorizontal from "../components/CardMovieHorizontal";

const { width, height } = Dimensions.get("window");

const DetailScreen = ({ route, navigation }) => {
  const { movieId, category } = route.params;
  const [youtubeId, setYoutubeId] = useState(null);
  const [genres, setGenres] = useState("");
  const [credit, setCredit] = useState("");
  const [choose, setChoose] = useState(1);

  const youtubeApi = `https://api.themoviedb.org/3/${
    category === "1" ? "movie" : "tv"
  }/${movieId}/videos?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataYoutube, Youtubeloading] = useFetch(youtubeApi);

  const detailApi = `https://api.themoviedb.org/3/${
    category === "1" ? "movie" : "tv"
  }/${movieId}?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataDetail, Detailloading] = useFetch(detailApi);

  const creditApi = `https://api.themoviedb.org/3/${
    category === "1" ? "movie" : "tv"
  }/${movieId}/credits?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataCredit, Creditloading] = useFetch(creditApi);

  const similiarApi = `https://api.themoviedb.org/3/${
    category === "1" ? "movie" : "tv"
  }/${movieId}/similar?api_key=464b6412840269fe91e87ba7d6958784&language=en-US&page=1`;
  const [dataSimiliar, Similiarloading] = useFetch(similiarApi);

  useEffect(() => {
    if (dataYoutube.results && dataDetail.genres) {
      setYoutubeId(dataYoutube.results[0].key);
      setGenres(dataDetail.genres);
      setCredit(dataCredit.cast);
    }
  }, [dataYoutube, dataDetail, dataCredit]);
  console.log(dataSimiliar);

  return (
    <View style={{ backgroundColor: "black" }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>Back</Text>
          </TouchableOpacity>
        </View>
        {Youtubeloading && Detailloading && Creditloading && Similiarloading ? (
          <SkeletonPlaceholder>
            <View style={{ width: width, height: 300 }} />
          </SkeletonPlaceholder>
        ) : (
          <View>
            <YouTube videoId={youtubeId} play loop style={{ height: 300 }} />
            <ScrollView>
              <View style={{ marginBottom: 50 }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: "white", marginHorizontal: 20, marginTop: 10, marginBottom: 5 }}>
                  {category === "1" ? dataDetail.title : dataDetail.name}
                </Text>
                <View style={{ marginHorizontal: 20, flexDirection: "row", flexWrap: "wrap" }}>
                  {genres ? (
                    genres.map((item, idx) => {
                      return (
                        <View key={item.id} style={{ backgroundColor: "red", borderRadius: 20, marginRight: 5, marginTop: 5 }}>
                          <Text style={{ color: "white", paddingHorizontal: 10 }}>{item.name}</Text>
                        </View>
                      );
                    })
                  ) : (
                    <Text style={{ color: "white" }}>Uncategories</Text>
                  )}
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: "row", height: 60 }}>
                  <View style={{ marginRight: 100 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Score</Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: dataDetail.vote_average < 6 ? "red" : "green" }}>
                      {dataDetail.vote_average * 10}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>{category === "1" ? "Release Date" : "First Air Date"}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>
                      {category === "1" ? dataDetail.release_date : dataDetail.first_air_date}
                    </Text>
                  </View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, marginBottom: 20 }}>Overview</Text>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, textAlign: "justify" }}>{dataDetail.overview}</Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                  <View style={{ flexDirection: "row", borderBottomWidth: 3, borderColor: "white", marginBottom: 20 }}>
                    <View style={{ marginRight: 30, marginBottom: 10 }}>
                      <TouchableOpacity onPress={() => setChoose(1)}>
                        <Text style={{ color: choose === 2 ? "white" : "blue", fontWeight: "bold", fontSize: 20 }}>Cast</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginRight: 30, marginBottom: 10 }}>
                      <TouchableOpacity onPress={() => setChoose(2)}>
                        <Text style={{ color: choose === 1 ? "white" : "blue", fontWeight: "bold", fontSize: 20 }}>Similiar Movie</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {choose === 1 && (
                    <FlatList
                      horizontal={true}
                      data={credit}
                      renderItem={({ item, index }) => <CreditCast list={item} />}
                      keyExtractor={(key, index) => index.toString()}
                    />
                  )}
                  {choose === 2 && (
                    <View>
                      <FlatList
                        horizontal={true}
                        data={dataSimiliar.results}
                        renderItem={({ item, index }) => <CardMovieHorizontal isMovie={true} list={item} isWrap={true} />}
                        keyExtractor={(key, index) => index.toString()}
                      />
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default DetailScreen;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "black",
    marginTop: 50,
    marginBottom: 35,
  },
});
