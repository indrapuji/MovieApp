import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, TextInput, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const registerScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [load, setLoad] = useState(false);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };

  const handdleLogin = () => {
    navigation.navigate('Login');
  };
  const handdleRegister = () => {
    setLoad(true);
    axios({
      method: 'post',
      // url: `http://localhost:3000/register`,
      url: `${Config.API_URL}/register`,
      data: value,
    })
      .then(({ data }) => {
        storeData(data.token);
        setLoad(false);
        Alert.alert('welcome', data.name);
        navigation.navigate('Home');
      })
      .catch((err) => {
        setLoad(false);
        Alert.alert(err.response.data.message);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {load ? <ActivityIndicator size="large" /> : <Text style={styles.title}>Register</Text>}
        <View style={styles.contentPosition}>
          <View style={styles.inputPosition}>
            <View>
              <TextInput
                placeholder="Enter Name"
                autoCapitalize="none"
                value={value.name}
                onChangeText={(text) => setValue({ ...value, name: text })}
                style={styles.inputSize}
              />
            </View>
            <View>
              <TextInput
                placeholder="Enter Email"
                autoCapitalize="none"
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
                style={styles.inputSize}
              />
            </View>
            <View>
              <TextInput
                placeholder="Enter Password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
                style={styles.inputSize}
              />
            </View>
            <View>
              <TextInput
                placeholder="Enter Address"
                autoCapitalize="none"
                value={value.address}
                onChangeText={(text) => setValue({ ...value, address: text })}
                numberOfLines={3}
                multiline={true}
                style={styles.inputAreaSize}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonPosition}>
          <TouchableOpacity onPress={() => handdleRegister()}>
            <LinearGradient colors={['#0278ae', '#51adcf']} style={styles.signIn}>
              <Text style={styles.textSign}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginTop: 15, flexDirection: 'row' }}>
              <Text style={{ color: 'white' }}>Have an Account, </Text>
              <TouchableOpacity onPress={() => handdleLogin()}>
                <Text style={{ color: '#0278ae', marginLeft: 5 }}>Login Here</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default registerScreen;

const { height, width } = Dimensions.get('screen');
const height_logo = height * 0.28;

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
    borderRadius: 50,
    flexDirection: 'row',
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
    paddingHorizontal: 20,
  },
  inputAreaSize: {
    width: width / 1.12,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputPosition: {
    alignItems: 'center',
  },
});
