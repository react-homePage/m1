/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {categoryData} from '../store/reducer/slice';

import CategoryWiseCard from '../component/CategoryWiseCard';
const CategoryWiseMovieList = ({route}) => {
  const dispatch = useDispatch();
  const {categoryName} = route?.params;
  console.log('category name', categoryName);
  const [movieList, setMovieList] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [selecteduserData, setSelecteduserData] = useState([]);
  const [selectAllState, setSelectAllState] = useState(false);

  const URL =
    'https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json';

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      try {
        const response = await axios.get(URL);
        const result = response.data.movies;

        // `arr` contains the fetched movie list immediately
        const arr = Array.isArray(result) ? result : [];

        // Filter using `arr`, not `movieList`
        const filterCategory = arr.filter(item => {
          return item?.genres?.includes(categoryName);
        });

        //dispatch
        dispatch(categoryData(filterCategory));

        // Update states after filtering
        setMovieList(arr); // Update the movie list state
        setFilterArray(filterCategory); // Update the filtered result state
      } catch (error) {
        console.error('Error occurred while fetching the data:', error);
      }
    };

    if (categoryName) {
      fetchAndFilterMovies();
    }
  }, [categoryName]); // Trigger fetch and filter when categoryName changes

  // console.log('filter array', filterArray);

  const arrayNew = useSelector(state => state?.movieData?.categorywiseData);
  console.log('arrayNew', arrayNew);

  const handleShowCheckbox = () => {
    setShowCheckBox(prev => !prev);
  };

  const handleUserData = item => {
    console.log('item', item);
    if (!selecteduserData.includes(item)) {
      setSelecteduserData([...selecteduserData, item]);
    } else {
      const result = selecteduserData.filter(value => value !== item);
      setSelecteduserData(result);
    }
  };

  console.log('selected user data', selecteduserData);

  const handleSelectAll = () => {
    if (selectAllState) {
      setSelecteduserData([]);
    } else {
      const data = arrayNew.map(value => value?.title);
      setSelecteduserData(data);
    }

    setSelectAllState(prev => !prev);
  };
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'black'}}>CategoryWiseMovieList</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          style={{backgroundColor: 'red'}}
          onPress={() => handleShowCheckbox()}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>showCheck</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'red'}}
          onPress={handleSelectAll}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>select all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'red'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Delete</Text>
        </TouchableOpacity>
      </View>
      {filterArray && filterArray.length > 0 ? (
        <>
          <FlatList
            data={filterArray}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <CategoryWiseCard
                item={item}
                showCheckBox={showCheckBox}
                handleUserData={handleUserData}
                checked={selecteduserData.includes(item?.title) ? true : false}
              />
            )}
          />
        </>
      ) : (
        <>
          <Text style={{color: 'black'}}>no match</Text>
        </>
      )}
    </View>
  );
};

export default CategoryWiseMovieList;

const styles = StyleSheet.create({});
