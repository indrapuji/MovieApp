import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, TextInput, ALert, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const registerScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const handdleLogin = () => {
    navigation.navigate('Login');
  };
  const handdleRegister = () => {
    Alert.alert('Welcome');
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5fdde5" />
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
            <LinearGradient colors={['#08d4c4', '#5fdde5']} style={styles.signIn}>
              <Text style={styles.textSign}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginTop: 15, flexDirection: 'row' }}>
              <Text style={{ color: 'white' }}>Have an Account, Login</Text>
              <TouchableOpacity onPress={() => handdleLogin()}>
                <Text style={{ color: '#08d4c4', marginLeft: 5 }}>Here</Text>
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
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
