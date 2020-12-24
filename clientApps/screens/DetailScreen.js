import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, StatusBar, FlatList, Image } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useFetch from '../hooks/useFetch';
import YouTube from 'react-native-youtube';
import CreditCast from '../components/CreditCast';
import CardMovieHorizontal from '../components/CardMovieHorizontal';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('screen');

const DetailScreen = ({ route, navigation }) => {
  const { movieId, category } = route.params;
  const [youtubeId, setYoutubeId] = useState(null);
  const [genres, setGenres] = useState('');
  const [credit, setCredit] = useState('');
  const [choose, setChoose] = useState(1);
  const [similiar, setSimiliar] = useState('');

  const youtubeApi = `${Config.TMDB_API}/3/${category === '1' ? 'movie' : 'tv'}/${movieId}/videos?api_key=${Config.TMDB_KEY}&language=en-US`;
  const [dataYoutube, Youtubeloading] = useFetch(youtubeApi);

  const detailApi = `${Config.TMDB_API}/3/${category === '1' ? 'movie' : 'tv'}/${movieId}?api_key=${Config.TMDB_KEY}&language=en-US`;
  const [dataDetail, Detailloading] = useFetch(detailApi);

  const creditApi = `${Config.TMDB_API}/3/${category === '1' ? 'movie' : 'tv'}/${movieId}/credits?api_key=${Config.TMDB_KEY}&language=en-US`;
  const [dataCredit, Creditloading] = useFetch(creditApi);

  const similiarApi = `${Config.TMDB_API}/3/${category === '1' ? 'movie' : 'tv'}/${movieId}/similar?api_key=${Config.TMDB_KEY}&language=en-US&page=1`;
  const [dataSimiliar, Similiarloading] = useFetch(similiarApi);

  useEffect(() => {
    if (dataDetail.genres) {
      if (dataYoutube.results.length > 0) {
        setYoutubeId(dataYoutube.results[0].key);
        setGenres(dataDetail.genres);
        setCredit(dataCredit.cast);
        setSimiliar(dataSimiliar.results);
      }
    }
  }, [dataYoutube, dataDetail, dataCredit, dataSimiliar]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Back</Text>
          </TouchableOpacity>
        </View>
        {Youtubeloading && Detailloading && Creditloading && Similiarloading ? (
          <SkeletonPlaceholder>
            <View style={{ width: width, height: 300 }} />
          </SkeletonPlaceholder>
        ) : (
          <View>
            {youtubeId !== null ? (
              <YouTube videoId={youtubeId} play loop style={{ height: 300 }} />
            ) : (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${dataDetail.backdrop_path}`,
                }}
                style={{ height: 300 }}
              />
            )}
            <ScrollView>
              <View style={{ marginBottom: 50 }}>
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
                        renderItem={({ item, index }) => <CardMovieHorizontal isMovie={true} isBlack={true} list={item} />}
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
    marginBottom: 35,
  },
});
