import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CardMovie from "../components/CardMovie";

const ContentScreen = ({ route }) => {
  const { data, title, type } = route.params;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => <CardMovie isMovie={type === "MOVIE" ? true : false} list={item} />}
          keyExtractor={(key, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#B9FFFC",
  },
  header: {
    backgroundColor: "#5fdde5",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
  },
  subText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});
