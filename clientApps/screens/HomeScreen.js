import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nowPopularMovie, nowUpcomingMovie } from "../store/actions/getMovie";
import { nowPlayingTV, nowPopularTV } from "../store/actions/getTVSHOW";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
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

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Movie</Text>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>Popular</Text>
              <TouchableOpacity>
                <Text style={styles.movieNext}>See More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={popularMovie}
              renderItem={({ item, index }) => <CardMovieHorizontal list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
          <View>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>UpComing</Text>
              <TouchableOpacity>
                <Text style={styles.movieNext}>See More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={upcomingMovie}
              renderItem={({ item, index }) => <CardMovieHorizontal list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
          <View>
            <Text style={styles.title}>Movie</Text>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>Popular</Text>
              <TouchableOpacity>
                <Text style={styles.movieNext}>See More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={popularTV}
              renderItem={({ item, index }) => <CardMovieHorizontal list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
          <View>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>Now Playing</Text>
              <TouchableOpacity>
                <Text style={styles.movieNext}>See More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={playingTV}
              renderItem={({ item, index }) => <CardMovieHorizontal list={item} />}
              keyExtractor={(key, index) => index.toString()}
            />
          </View>
        </ScrollView>
        {/* <Button title="Go to Detail" onPress={() => navigation.navigate("Detail")} /> */}
      </View>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moviePath: {
    // backgroundColor: "#B9FFFC",
    // backgroundColor: "#5fdde5",
  },
  movieHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
    marginVertical: 10,
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
