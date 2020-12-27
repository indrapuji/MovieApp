import React from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useFetch from '@hooks/useFetch';
import CardMovieHorizontal from '@components/CardMovieHorizontal';

const CastDetailScreen = ({ route, navigation }) => {
  const { person_id } = route.params;

  const personApi = `https://api.themoviedb.org/3/person/${person_id}?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataPerson, Personloading] = useFetch(personApi);

  const movieApi = `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=464b6412840269fe91e87ba7d6958784&language=en-US`;
  const [dataMovie, Movieloading] = useFetch(movieApi);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{ marginHorizontal: 20, marginBottom: 30, flexDirection: 'row', height: 20 }}>
              <View style={{ justifyContent: 'flex-end' }}>
                <Icon name="chevron-left" size={15} color="white" />
              </View>
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Back</Text>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView>
            {dataPerson && (
              <View style={{ marginHorizontal: 20 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${dataPerson.profile_path}` }}
                    style={{ height: 300, width: 200, borderRadius: 20 }}
                  />
                </View>
                <View style={{ marginTop: 30 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>{dataPerson.name}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Biography</Text>
                  <Text style={{ color: 'white' }}>{dataPerson.biography !== null ? dataPerson.biography : '-'}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Gender</Text>
                  <Text style={{ color: 'white' }}>{dataPerson.gender === 1 ? 'female' : 'male'}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Birthday</Text>
                  <Text style={{ color: 'white' }}>{dataPerson.birthday !== null ? dataPerson.birthday : 'unknown'}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Place of Birth</Text>
                  <Text style={{ color: 'white' }}>{dataPerson.place_of_birth !== null ? dataPerson.place_of_birth : 'unknown'}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Also Known As</Text>
                  {dataPerson.also_known_as &&
                    dataPerson.also_known_as.length > 0 &&
                    dataPerson.also_known_as.map((item, idx) => {
                      return (
                        <Text key={idx} style={{ color: 'white', textAlign: 'left' }}>
                          {item}
                        </Text>
                      );
                    })}
                  {dataPerson.also_known_as && dataPerson.also_known_as.length === 0 && <Text style={{ color: 'white' }}>unknown</Text>}
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Known For Movie</Text>
                  <FlatList
                    horizontal={true}
                    data={dataMovie.cast}
                    renderItem={({ item, index }) => <CardMovieHorizontal isMovie={true} isBlack={true} list={item} />}
                    keyExtractor={(key, index) => index.toString()}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
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

export default CastDetailScreen;
