import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CardMovieHorizontal = (props) => {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          {!props.list ? (
            <SkeletonPlaceholder>
              <View
                style={{
                  height: height < 828 ? height / 2 : 300,
                  width: width,
                  borderRadius: 20,
                }}
              />
            </SkeletonPlaceholder>
          ) : (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${props.list.poster_path}`,
              }}
              style={styles.imageCard}
            />
          )}
          <View style={styles.imageSpace}>
            <Text numberOfLines={2} style={styles.movieTitle}>
              {props.isMovie ? props.list.title : props.list.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
  imageSpace: {
    width: 115,
    marginTop: 5,
  },
  movieTitle: {
    marginBottom: 5,
    textAlign: 'center',
  },
});
