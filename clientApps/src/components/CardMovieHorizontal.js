import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Modal, TouchableHighlight } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '@hooks/host';

const CardMovieHorizontal = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!props.list) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props]);

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

  const addWatchlist = (movie_id, poster, title, category_id) => {
    setShowModal(!showModal);
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
    <View>
      <View style={styles.container}>
        {loading ? (
          <SkeletonPlaceholder>
            <View style={styles.imageCard} />
            <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
            <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
          </SkeletonPlaceholder>
        ) : (
          <>
            {props.list.poster_path ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { movieId: props.list.id, category: props.isMovie ? '1' : '0' })}
                onLongPress={() => setShowModal(true)}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${props.list.poster_path}`,
                  }}
                  style={styles.imageCard}
                />
                <Text numberOfLines={2} style={styles.movieTitle}>
                  {props.isMovie ? props.list.title : props.list.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <Image source={require('@assets/Images/default-image.png')} style={styles.imageCard} />
                <Text numberOfLines={2} style={styles.movieTitle}>
                  {props.isMovie ? props.list.title : props.list.name}
                </Text>
              </>
            )}
          </>
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add {props.isMovie ? props.list.title : props.list.name} to Watchlist</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  addWatchlist(props.list.id, props.list.poster_path, props.isMovie ? props.list.title : props.list.name, props.isMovie ? '1' : '0');
                }}
              >
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

export default CardMovieHorizontal;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  imageCard: {
    width: 115,
    height: 170,
    borderRadius: 10,
  },
  movieTitle: {
    width: 115,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: 'white',
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
