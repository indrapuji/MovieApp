import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = (props) => {
  const { height, width } = Dimensions.get('screen');
  const [searchMovie, setSearchMovie] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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

  const searchNewMovie = () => {
    if (searchMovie) {
      const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=464b6412840269fe91e87ba7d6958784&language=en-US&query=${searchMovie}&page=1&include_adult=false`;
      fetch(searchApiUrl)
        .then((res) => res.json())
        .then((data) => {
          props.onSubmit(data);
          setShowSearch(false);
          setSearchMovie('');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      props.onSubmit('');
    }
  };
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>CINEMA HERO</Text>
      <Text style={styles.subText}>Million of movie to discover</Text>
      <View style={styles.headerIcon}>
        <TouchableOpacity onPress={() => null}>
          <Icon name="navicon" color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Icon name="search" color={props.screen === 'home' ? 'white' : 'black'} size={20} />
        </TouchableOpacity>
      </View>
      {showSearch && props.screen === 'home' && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 20, marginTop: 10 }}>
          <TextInput
            placeholder="Search Movie or Tv"
            autoCapitalize="none"
            value={searchMovie}
            onChangeText={(text) => setSearchMovie(text)}
            style={{
              width: width / 1.7,
              height: 40,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: 'white',
              paddingLeft: 20,
              paddingRight: 50,
            }}
          />
          <TouchableOpacity onPress={() => searchNewMovie()}>
            <View
              style={{
                width: width / 4,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'blue',
                marginLeft: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
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
