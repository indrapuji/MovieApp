import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

const CardMovie = (props) => {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${props.list.backdrop_path}` }} style={styles.imageCard} />
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
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
