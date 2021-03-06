import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, TextInput, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import host from '@hooks/host';

const LoginScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };

  const handdleLogin = () => {
    setLoad(true);
    axios({
      method: 'post',
      url: `${host}/login`,
      data: value,
    })
      .then(({ data }) => {
        storeData(data.token);
        setLoad(false);
        navigation.navigate('Home');
      })
      .catch((err) => {
        setLoad(false);
        Alert.alert(err.response.data.message);
      });
  };

  const handdleRegister = () => {
    navigation.navigate('Register');
  };

  const handdleSee = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.contentPosition}>
          <View style={styles.inputPosition}>
            <View>
              <TextInput
                placeholder="Enter Your Email"
                autoCapitalize="none"
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
                style={styles.inputSize}
              />
            </View>
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Enter Your Password"
                secureTextEntry={show ? false : true}
                autoCapitalize="none"
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
                style={styles.inputSize}
              />
              <TouchableOpacity style={{ position: 'absolute', top: 13, right: 20 }} onPress={() => handdleSee()}>
                <Icon name={show ? 'eye' : 'eye-slash'} color="grey" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.buttonPosition}>
          {load ? (
            <TouchableOpacity onPress={() => null}>
              <View style={[styles.signIn, { backgroundColor: 'white' }]}>
                <Text style={styles.textSign}>
                  <ActivityIndicator size="small" color="black" />
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handdleLogin()}>
              <LinearGradient colors={['#0278ae', '#51adcf']} style={styles.signIn}>
                <Text style={styles.textSign}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <Text style={{ color: 'white' }}>Dont have Account, </Text>
            <TouchableOpacity onPress={() => handdleRegister()}>
              <Text style={{ color: '#0278ae', marginLeft: 5 }}>Register Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5fdde5',
  },
  footer: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 30,
    position: 'relative',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  buttonPosition: {
    alignItems: 'center',
  },
  signIn: {
    width: width / 1.12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#08d4c4',
  },
  contentPosition: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputSize: {
    width: width / 1.12,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 50,
  },
  inputPosition: {
    alignItems: 'center',
  },
});
