import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CardMovie from '../components/CardMovie';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContentScreen = ({ route, navigation }) => {
  const { data, title, type } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ marginHorizontal: 20, marginBottom: 10, flexDirection: 'row', height: 20 }}>
            <View style={{ justifyContent: 'flex-end' }}>
              <Icon name="chevron-left" size={15} color="white" />
            </View>
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Back</Text>
            </View>
          </View>
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={({ item, index }) => <CardMovie isMovie={type === 'MOVIE' ? true : false} list={item} />}
          keyExtractor={(key, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginBottom: 80,
  },
  header: {
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
});
