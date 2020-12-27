import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
  };
  const handdleLogout = () => {
    clearAll();
  };
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>CINEMA HERO</Text>
      <Text style={styles.subText}>Million of movie to discover</Text>
      <View style={styles.headerIcon}>
        <TouchableOpacity onPress={() => null}>
          <Icon name="navicon" color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handdleLogout()}>
          <Icon name="search" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
  subText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  headerIcon: {
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Header;
