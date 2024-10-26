/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CategoryCard from '../component/CategoryCard';

const CategoryScreen = ({navigation}) => {
  const [movieList, setMovieList] = useState([]);

  const URL =
    'https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json';

  useEffect(() => {
    const apiData = async () => {
      try {
        const response = await axios.get(URL);
        const result = response.data.genres;
        console.log('result', result);

        const arr = Array.isArray(result) ? result : [];
        setMovieList(arr);
      } catch (error) {
        console.error('error occured while fetching the data', error);
      }
    };

    apiData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000814',
        flexDirection: 'row',
        columnGap: 30,
      }}>
      {movieList && movieList.length > 0 ? (
        <FlatList
          data={movieList}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={{alignSelf: 'center', columnGap: 30, margin: 10}}>
              <CategoryCard item={item} />
            </View>
          )}
        />
      ) : (
        <Text>"No Data Available"</Text>
      )}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
