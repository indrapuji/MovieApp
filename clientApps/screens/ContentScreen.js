import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CardMovie from '../components/CardMovie';

const ContentScreen = ({ route }) => {
  const { data, title, type } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
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
    marginBottom: 35,
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
