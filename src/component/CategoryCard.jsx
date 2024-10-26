/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CategoryCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('categorywiseMovie', {categoryName: item})
      }
      style={{
        backgroundColor: '#22577a',
        height: 60,
        width: 300,
        columnGap: 30,
        rowGap: 10,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          paddingVertical: 10,
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
