import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nowPopularMovie, nowUpcomingMovie } from "../store/actions/getMovie";
import { nowPlayingTV, nowPopularTV } from "../store/actions/getTVSHOW";
import { StyleSheet, View, Text, FlatList, StatusBar } from "react-native";
import CardMovieHorizontal from "../components/CardMovieHorizontal";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const upcomingMovie = useSelector((state) => state.movieReducer.upcomingmovie);
  const popularMovie = useSelector((state) => state.movieReducer.popularmovie);
  const popularTV = useSelector((state) => state.tvReducer.popularTV);
  const playingTV = useSelector((state) => state.tvReducer.playingTV);

  useEffect(() => {
    dispatch(nowPopularMovie());
    dispatch(nowUpcomingMovie());
    dispatch(nowPopularTV());
    dispatch(nowPlayingTV());
  }, [dispatch]);

  const moviePopular = (title, type) => {
    const data = popularMovie;
    navigation.navigate("Content", { data, title, type });
  };
  const movieUpcoming = (title, type) => {
    const data = upcomingMovie;
    navigation.navigate("Content", { data, title, type });
  };
  const TVPopular = (title, type) => {
    const data = popularTV;
    navigation.navigate("Content", { data, title, type });
  };
  const TVPlaying = (title, type) => {
    const data = playingTV;
    navigation.navigate("Content", { data, title, type });
  };

  return (
    <>
      <StatusBar backgroundColor="#5fdde5" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CINEMA HERO</Text>
          <Text style={styles.subText}>Million of movie to discover</Text>
        </View>
        <ScrollView>
          <View>
            <Text style={styles.title}>Movie</Text>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>Popular</Text>
              <TouchableOpacity onPress={() => moviePopular("Popular Movie", "MOVIE")}>
                <Text style={styles.movieNext}>More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={popularMovie.slice(0, 8)}
              renderItem={({ item, index }) => <CardMovieHorizontal isMovie={true} list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
          <View>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>UpComing</Text>
              <TouchableOpacity onPress={() => movieUpcoming("Upcoming Movie", "MOVIE")}>
                <Text style={styles.movieNext}>More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={upcomingMovie.slice(0, 8)}
              renderItem={({ item, index }) => <CardMovieHorizontal isMovie={true} list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
          <View>
            <Text style={styles.title}>TV Show</Text>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>Popular</Text>
              <TouchableOpacity onPress={() => TVPopular("Popular TV Show", "TV")}>
                <Text style={styles.movieNext}>More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={popularTV.slice(0, 8)}
              renderItem={({ item, index }) => <CardMovieHorizontal list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
          <View>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>Now Playing</Text>
              <TouchableOpacity onPress={() => TVPlaying("Now Playing TV Show", "TV")}>
                <Text style={styles.movieNext}>More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={playingTV.slice(0, 8)}
              renderItem={({ item, index }) => <CardMovieHorizontal list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#B9FFFC",
    marginTop: 35,
    marginBottom: 35,
  },
  header: {
    backgroundColor: "#5fdde5",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
  },
  subText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  moviePath: {
    // backgroundColor: "#B9FFFC",
    // backgroundColor: "#5fdde5",
  },
  movieHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginLeft: 10,
    fontWeight: "bold",
    marginTop: 15,
  },
  movieTitle: {
    fontSize: 15,
    marginLeft: 10,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieNext: {
    marginRight: 10,
    fontSize: 13,
    color: "blue",
  },
});
