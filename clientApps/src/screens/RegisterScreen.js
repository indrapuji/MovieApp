import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, TextInput, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import host from '@hooks/host';

const registerScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [repass, setRepass] = useState('');
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
    navigation.navigate('Login');
  };

  const handdleSee = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handdleRegister = () => {
    if (value.password === repass) {
      setLoad(true);
      axios({
        method: 'post',
        url: `${host}/register`,
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
    } else {
      Alert.alert('Password Not Match');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Register</Text>
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
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Enter Password"
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
            <View>
              <TextInput
                placeholder="Re-enter Password"
                secureTextEntry={show ? false : true}
                autoCapitalize="none"
                value={repass}
                onChangeText={(text) => setRepass(text)}
                style={[styles.inputSize, { borderColor: value.password === repass ? 'white' : 'red', borderWidth: 1 }]}
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
          {load ? (
            <TouchableOpacity onPress={() => null}>
              <View style={[styles.signIn, { backgroundColor: 'white' }]}>
                <Text style={styles.textSign}>
                  <ActivityIndicator size="small" color="black" />
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handdleRegister()}>
              <LinearGradient colors={['#0278ae', '#51adcf']} style={styles.signIn}>
                <Text style={styles.textSign}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <Text style={{ color: 'white' }}>Have an Account, </Text>
            <TouchableOpacity onPress={() => handdleLogin()}>
              <Text style={{ color: '#0278ae', marginLeft: 5 }}>Login Here</Text>
            </TouchableOpacity>
          </View>
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
    paddingLeft: 20,
    paddingRight: 50,
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
