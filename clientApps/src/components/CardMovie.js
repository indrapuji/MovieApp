import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useNavigation } from '@react-navigation/native';

const CardMovie = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.list) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props]);

  return (
    <View style={{ marginBottom: 10 }}>
      {loading ? (
        <SkeletonPlaceholder>
          <View style={styles.imageCard} />
          <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
          <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
        </SkeletonPlaceholder>
      ) : (
        <>
          {props.list.backdrop_path ? (
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
                  {props.isMovie ? props.list.original_title : props.list.original_name}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.imageContainer}>
                <Image source={require('@assets/Images/default-image.png')} style={styles.imageCard} />
              </View>
              <View style={styles.imageSpace}>
                <Text numberOfLines={2} style={styles.movieTitle}>
                  {props.isMovie ? props.list.original_title : props.list.original_name}
                </Text>
              </View>
            </>
          )}
        </>
      )}
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
