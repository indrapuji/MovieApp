import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert, TouchableHighlight } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Header from '@components/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '@hooks/host';

const WatchlistScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [wish, setWish] = useState([]);
  const [wishlistId, setwishlistId] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [check, setCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isFocused = useIsFocused();

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
    if (token) {
      axios({
        method: 'get',
        url: `${host}/wishlist`,
        headers: { token },
      })
        .then(({ data }) => {
          setWish(data.results);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [token, isFocused, check]);

  const wishlistNewId = (id, mt) => {
    setwishlistId(id);
    setMovieTitle(mt);
    setShowModal(true);
  };

  const deleteWatchlist = () => {
    setShowModal(!showModal);
    if (token) {
      axios({
        method: 'delete',
        url: `${host}/wishlist/${wishlistId}`,
        headers: { token },
      })
        .then(({ data }) => {
          Alert.alert(data.message);
          setCheck(!check);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView>
        <View style={styles.container}>
          <Header />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', paddingBottom: 5, fontSize: 20 }}>Watchlist</Text>
          </View>
          <ScrollView>
            <View style={{ marginTop: 20, marginBottom: 70, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: 10 }}>
              {wish &&
                wish.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', { movieId: item.movieId, category: item.type })}
                        onLongPress={() => wishlistNewId(item.id, item.title)}
                      >
                        <View style={{ marginRight: 5, marginLeft: 5 }}>
                          <Image
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                            }}
                            style={styles.imageCard}
                          />
                          <Text numberOfLines={2} style={styles.movieTitle}>
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Delete {movieTitle} from Watchlist</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight style={{ ...styles.openButton, backgroundColor: '#2196F3' }} onPress={() => deleteWatchlist()}>
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: 'red' }}
                onPress={() => {
                  setShowModal(!showModal);
                }}
              >
                <Text style={styles.textStyle}>No</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    width: 115,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
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
  imageCard: {
    width: 115,
    height: 170,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    width: 100,
    height: 50,
    elevation: 2,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
  },
});

export default WatchlistScreen;
