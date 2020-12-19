import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const LoginScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const handdleLogin = () => {
    Alert.alert('Welcome');
    navigation.navigate('Home');
  };

  const handdleRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5fdde5" />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.contentPosition}>
          <View style={styles.inputPosition}>
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
          </View>
        </View>
        <View style={styles.buttonPosition}>
          <TouchableOpacity onPress={() => handdleLogin()}>
            <LinearGradient colors={['#08d4c4', '#5fdde5']} style={styles.signIn}>
              <Text style={styles.textSign}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginTop: 15, flexDirection: 'row' }}>
              <Text style={{ color: 'white' }}>Dont have Account, Register</Text>
              <TouchableOpacity onPress={() => handdleRegister()}>
                <Text style={{ color: '#08d4c4', marginLeft: 5 }}>Here</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
    paddingLeft: 20,
  },
  inputPosition: {
    alignItems: 'center',
  },
});
