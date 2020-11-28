import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from "@react-navigation/native";

const CardMovieHorizontal = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.list) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props]);
  // console.log(props.isMovie);
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Detail", { movieId: props.list.id, category: props.isMovie ? "1" : "0" })}>
        <View style={styles.container}>
          {loading ? (
            <SkeletonPlaceholder>
              <View style={styles.imageCard} />
              <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
              <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
            </SkeletonPlaceholder>
          ) : (
            <>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${props.list.poster_path}`,
                }}
                style={styles.imageCard}
              />
              <Text numberOfLines={2} style={styles.movieTitle}>
                {props.isMovie ? props.list.title : props.list.name}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardMovieHorizontal;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
  },
});
