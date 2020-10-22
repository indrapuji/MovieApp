import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image animation="bounceIn" source={require("../assets/logo.png")} style={styles.logo} resizeMode="stretch" />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate("Splash2")}>
          <Text style={styles.textSign}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5fdde5",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginBottom: 10,
    marginRight: 10,
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    marginRight: 20,
    marginBottom: 10,
  },
});
