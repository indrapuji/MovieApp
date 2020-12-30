import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardMovie = (props) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { movieId: props.list.id, category: props.isMovie ? '1' : '0' })}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${props.list.backdrop_path}` }} style={styles.imageCard} />
          <View
            style={{
              position: 'absolute',
              bottom: -10,
              right: 25,
              width: 35,
              height: 35,
              borderRadius: 50,
              borderWidth: 3,
              justifyContent: 'center',
              borderColor: props.list.vote_average >= 6 ? 'blue' : 'red',
              backgroundColor: 'white',
            }}
          >
            <Text style={{ color: props.list.vote_average >= 6 ? 'blue' : 'red', textAlign: 'center', fontWeight: 'bold' }}>
              {props.list.vote_average}
            </Text>
          </View>
        </View>
        <View style={styles.imageSpace}>
          <Text numberOfLines={2} style={styles.movieTitle}>
            {props.isMovie ? props.list.title : props.list.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardMovie;

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },
  imageCard: {
    width: 380,
    height: 200,
    borderRadius: 10,
  },
  imageSpace: {
    width: 410,
    marginTop: 5,
  },
  movieTitle: {
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
  },
});
