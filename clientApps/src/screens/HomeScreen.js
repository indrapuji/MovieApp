import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nowPopularMovie, nowUpcomingMovie } from '@store/actions/getMovie';
import { nowPlayingTV, nowPopularTV } from '@store/actions/getTVSHOW';
import { StyleSheet, View, Text, FlatList, StatusBar, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import CardMovieHorizontal from '@components/CardMovieHorizontal';
import Header from '@components/Header';
// import BottomSheet from 'reanimated-bottom-sheet';
import useFetch from '@hooks/useFetch';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const upcomingMovie = useSelector((state) => state.movieReducer.upcomingmovie);
  const popularMovie = useSelector((state) => state.movieReducer.popularmovie);
  const popularTV = useSelector((state) => state.tvReducer.popularTV);
  const playingTV = useSelector((state) => state.tvReducer.playingTV);

  const movieApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [movieGenre, movieLoading] = useFetch(movieApi);
  const tvApi = `https://api.themoviedb.org/3/genre/tv/list?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [tvGenre, tvLoading] = useFetch(tvApi);

  useEffect(() => {
    dispatch(nowPopularMovie());
    dispatch(nowUpcomingMovie());
    dispatch(nowPopularTV());
    dispatch(nowPlayingTV());
  }, [dispatch]);

  const moviePopular = (title, type) => {
    const data = popularMovie;
    navigation.navigate('Content', { data, title, type });
  };
  const movieUpcoming = (title, type) => {
    const data = upcomingMovie;
    navigation.navigate('Content', { data, title, type });
  };
  const TVPopular = (title, type) => {
    const data = popularTV;
    navigation.navigate('Content', { data, title, type });
  };
  const TVPlaying = (title, type) => {
    const data = playingTV;
    navigation.navigate('Content', { data, title, type });
  };
  function onSearchSubmit(payload) {
    const title = 'Search';
    const type = 'MOVIE';
    navigation.navigate('Content', { data: payload.results, title, type });
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView>
        <View style={styles.container}>
          <Header onSubmit={onSearchSubmit} screen={'home'} />
          <ScrollView>
            <View>
              <Text style={styles.title}>Movie</Text>
              <View style={styles.movieHeader}>
                <Text style={styles.movieTitle}>Popular</Text>
                <TouchableOpacity onPress={() => moviePopular('Popular Movie', 'MOVIE')}>
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
                <TouchableOpacity onPress={() => movieUpcoming('Upcoming Movie', 'MOVIE')}>
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
            <View style={{ marginTop: 20 }}>
              <Text style={styles.title}>TV Show</Text>
              <View style={styles.movieHeader}>
                <Text style={styles.movieTitle}>Popular</Text>
                <TouchableOpacity onPress={() => TVPopular('Popular TV Show', 'TV')}>
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
                <TouchableOpacity onPress={() => TVPlaying('Now Playing TV Show', 'TV')}>
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
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 230,
  },
  header: {
    backgroundColor: 'black',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
  subText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  headerIcon: {
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'right',
    marginRight: 10,
  },
  movieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  movieTitle: {
    fontSize: 15,
    marginLeft: 10,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieNext: {
    marginRight: 10,
    fontSize: 13,
    color: 'blue',
  },
  bottomSheetContainer: {
    backgroundColor: 'black',
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  bottomSheetToggle: {
    borderWidth: 2,
    marginTop: 20,
    borderColor: 'white',
    width: 60,
    alignSelf: 'center',
    borderRadius: 20,
  },
  bottomSheetTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomSheetCategory: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomSheetText: {
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  categoryWrap: {
    backgroundColor: 'red',
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
  },
  BottomSheetWrap: {
    backgroundColor: 'black',
    padding: 16,
    height: 800,
  },
});
