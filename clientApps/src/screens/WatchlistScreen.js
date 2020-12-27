import React from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Header from '@components/Header';

const WatchlistScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView>
        <View style={styles.container}>
          <Header />
          <ScrollView>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Watchlist Screen</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 230,
  },
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
  categoryText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'right',
    marginRight: 10,
  },
  movieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  movieTitle: {
    fontSize: 15,
    marginLeft: 10,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieNext: {
    marginRight: 10,
    fontSize: 13,
    color: 'blue',
  },
  bottomSheetContainer: {
    backgroundColor: 'black',
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  bottomSheetToggle: {
    borderWidth: 2,
    marginTop: 20,
    borderColor: 'white',
    width: 60,
    alignSelf: 'center',
    borderRadius: 20,
  },
  bottomSheetTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomSheetCategory: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomSheetText: {
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  categoryWrap: {
    backgroundColor: 'red',
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
  },
  BottomSheetWrap: {
    backgroundColor: 'black',
    padding: 16,
    height: 800,
  },
});

export default WatchlistScreen;
