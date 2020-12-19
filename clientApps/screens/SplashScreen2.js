import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5fdde5" />
      <View style={styles.header}>
        <Animatable.Image animation="bounceInDown" source={require('../assets/logo.png')} style={styles.logo} resizeMode="stretch" />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Cinema Hero</Text>
        <View style={styles.buttonPosition}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinearGradient colors={['#08d4c4', '#5fdde5']} style={styles.signIn}>
              <Text style={styles.textSign}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <LinearGradient colors={['#08d4c4', '#5fdde5']} style={styles.signIn}>
              <Text style={styles.textSign}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height, width } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5fdde5',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#05375a',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  buttonPosition: {
    alignItems: 'center',
    marginTop: 40,
  },
  signIn: {
    width: width - 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginBottom: 20,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
