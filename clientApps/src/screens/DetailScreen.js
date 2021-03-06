import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, StatusBar, FlatList, Image, Alert } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useFetch from '@hooks/useFetch';
import YouTube from 'react-native-youtube';
import CreditCast from '@components/CreditCast';
import CardMovieHorizontal from '@components/CardMovieHorizontal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '@hooks/host';

const { width, height } = Dimensions.get('screen');

const DetailScreen = ({ route, navigation }) => {
  const { movieId, category } = route.params;

  const [youtubeId, setYoutubeId] = useState(null);
  const [genres, setGenres] = useState('');
  const [credit, setCredit] = useState('');
  const [choose, setChoose] = useState(1);
  const [similiar, setSimiliar] = useState('');
  const [token, setToken] = useState('');
  const [isReady, setIsReady] = useState(false);
  const isFocused = useIsFocused();

  const youtubeApi = `https://api.themoviedb.org/3/${
    category === '1' ? 'movie' : 'tv'
  }/${movieId}/videos?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataYoutube, Youtubeloading] = useFetch(youtubeApi);

  const detailApi = `https://api.themoviedb.org/3/${
    category === '1' ? 'movie' : 'tv'
  }/${movieId}?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataDetail, Detailloading] = useFetch(detailApi);

  const creditApi = `https://api.themoviedb.org/3/${
    category === '1' ? 'movie' : 'tv'
  }/${movieId}/credits?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataCredit, Creditloading] = useFetch(creditApi);

  const similiarApi = `https://api.themoviedb.org/3/${
    category === '1' ? 'movie' : 'tv'
  }/${movieId}/similar?api_key=464b6412840269fe91e87ba7d6958784&language=en-US&page=1`;
  const [dataSimiliar, Similiarloading] = useFetch(similiarApi);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataDetail.genres) {
      if (dataYoutube.results) {
        if (dataYoutube.results.length > 0 || dataYoutube.results.length !== undefined) {
          setYoutubeId(dataYoutube.results[0].key);
          setGenres(dataDetail.genres);
          setCredit(dataCredit.cast);
          setSimiliar(dataSimiliar.results);
        }
      }
    }
  }, [dataYoutube, dataDetail, dataCredit, dataSimiliar]);

  const addWatchlist = (movie_id, poster, title, category_id) => {
    axios({
      method: 'post',
      url: `${host}/wishlist`,
      data: {
        movieId: movie_id,
        title: title,
        poster_path: poster,
        type: category_id,
      },
      headers: { token },
    })
      .then(({ data }) => {
        Alert.alert(data.message);
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ marginHorizontal: 20, marginBottom: 10, flexDirection: 'row', height: 20 }}>
            <View style={{ justifyContent: 'flex-end' }}>
              <Icon name="chevron-left" size={15} color="white" />
            </View>
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Back</Text>
            </View>
          </View>
        </TouchableOpacity>
        {Youtubeloading && Detailloading && Creditloading && Similiarloading ? (
          <SkeletonPlaceholder>
            <View style={{ width: width, height: 300 }} />
          </SkeletonPlaceholder>
        ) : (
          <View>
            {youtubeId !== null ? (
              <YouTube
                apiKey={'AIzaSyC0lOc_m - wH6fLoLieq9OBNP65vepABUig'}
                videoId={youtubeId}
                // play={isFocused}
                style={{ height: 300 }}
                onReady={() => setIsReady(true)}
              />
            ) : (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${dataDetail.backdrop_path}`,
                }}
                style={{ height: 300 }}
              />
            )}
            <TouchableOpacity
              onPress={() => addWatchlist(movieId, dataDetail.backdrop_path, category === '1' ? dataDetail.title : dataDetail.name, category)}
            >
              <View style={{ marginHorizontal: 20, marginTop: 5 }}>
                <View style={{ backgroundColor: 'blue', borderRadius: 10, height: 40, justifyContent: 'center' }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>Add to watchlist</Text>
                </View>
              </View>
            </TouchableOpacity>
            <ScrollView>
              <View style={{ marginBottom: 80 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginHorizontal: 20, marginTop: 10, marginBottom: 5 }}>
                  {category === '1' ? dataDetail.title : dataDetail.name}
                </Text>
                <View style={{ marginHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {genres ? (
                    genres.map((item, idx) => {
                      return (
                        <View key={item.id} style={{ backgroundColor: 'red', borderRadius: 20, marginRight: 5, marginTop: 5 }}>
                          <Text style={{ color: 'white', paddingHorizontal: 10 }}>{item.name}</Text>
                        </View>
                      );
                    })
                  ) : (
                    <Text style={{ color: 'white' }}>Uncategories</Text>
                  )}
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', height: 60 }}>
                  <View style={{ marginRight: 100 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Rating</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: dataDetail.vote_average < 6 ? 'red' : 'green' }}>
                      {dataDetail.vote_average * 10}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{category === '1' ? 'Release Date' : 'First Air Date'}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>
                      {category === '1' ? dataDetail.release_date : dataDetail.first_air_date}
                    </Text>
                  </View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Overview</Text>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'justify' }}>{dataDetail.overview}</Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 300 }}>
                  <View style={{ flexDirection: 'row', borderBottomWidth: 3, borderColor: 'white', marginBottom: 20 }}>
                    <View style={{ marginRight: 30, marginBottom: 10 }}>
                      <TouchableOpacity onPress={() => setChoose(1)}>
                        <Text style={{ color: choose === 2 ? 'white' : 'blue', fontWeight: 'bold', fontSize: 20 }}>Cast</Text>
                      </TouchableOpacity>
                    </View>
                    {dataSimiliar.total_results > 0 && (
                      <View style={{ marginRight: 30, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => setChoose(2)}>
                          <Text style={{ color: choose === 1 ? 'white' : 'blue', fontWeight: 'bold', fontSize: 20 }}>Similiar Movie</Text>
                        </TouchableOpacity>
                      </View>
                    )}
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
                        data={similiar}
                        renderItem={({ item, index }) => <CardMovieHorizontal isMovie={category === '1' ? true : false} isBlack={true} list={item} />}
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
    flex: 1,
    backgroundColor: 'black',
    marginTop: 50,
  },
});
