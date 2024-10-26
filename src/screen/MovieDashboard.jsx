/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from '../component/MovieCard';
import {SafeAreaView} from 'react-native-safe-area-context';

const MovieDashboard = () => {
  const [movieData, setMovieData] = useState([]);
  const [searchDataArray, setSearchDataArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeCard, setActiveCard] = useState(null);
  const [refreshing, setRefreshing] = useState(true);

  //manage color change in background
  const handleCardColor = itemId => {
    //id matter krti hai  tbhi  pta lagega kis card pe click  hua h usi ko  particular style dedenge movieCard me
    if (activeCard === itemId) {
      setActiveCard(null);
    } else {
      setActiveCard(itemId);
    }
  };
  // console.log('search value', searchValue);
  const [loader, setLoader] = useState(true);
  const API =
    'https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json';

  const apiFetch = async () => {
    console.log('refresh');
    try {
      const response = await axios.get(API);
      const result = response?.data?.movies;

      const data = Array.isArray(result) ? result : [];

      setMovieData(data);
      setSearchDataArray(data);
      setRefreshing(false);
    } catch (error) {
      console.error('error comes while fewtching api  data', error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    apiFetch();
  }, []);

  const handleSearch = () => {
    const value = searchValue.toLowerCase().trim();
    console.log('received Value', value);
    if (!value || value === '') {
      setSearchDataArray(movieData);
    } else {
      //original  movie array pe search  krnege movies
      const filterArray = movieData.filter(item =>
        item.title.toLowerCase().includes(value),
      );
      // console.log('filterArray', filterArray);
      setSearchDataArray(filterArray);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        {loader && <ActivityIndicator size="large" />}
        {refreshing ? <ActivityIndicator /> : null}
        <View style={{alignSelf: 'center', margin: 10}}>
          <TextInput
            style={styles.textBox}
            placeholder="search movies"
            placeholderTextColor="black"
            value={searchValue}
            onChangeText={val => {
              setSearchValue(val);
              handleSearch();
            }}
          />
        </View>

        {/* no value we get in searchData array it means no  result releted to  search  is there in array */}
        {searchValue && searchDataArray.length === 0 ? (
          <>
            <Text style={styles.errorText}>No data found while Searching</Text>
          </>
        ) : (
          <>
            <FlatList
              numColumns={2}
              data={searchDataArray}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={apiFetch} />
              }
              renderItem={({item}) => (
                <View style={{backgroundColor: '#12343b'}}>
                  <MovieCard
                    item={item}
                    activeCard={activeCard}
                    handleCardColor={handleCardColor}
                  />
                </View>
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MovieDashboard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    margin: 'auto',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBox: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 5,
    width: 300,
    color: 'black',
    fontSize: 20,
  },
});
