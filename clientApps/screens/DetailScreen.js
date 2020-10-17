import React from "react";
import { StyleSheet, View, Text } from "react-native";

const DetailScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Detail Screen</Text>
      </View>
    </>
  );
};

export default DetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
