/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';

const CategoryWiseCard = ({
  item,
  showCheckBox,

  handleUserData,
  checked,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: 30,
        backgroundColor: 'pink',
        margin: 10,
      }}>
      <View style={{width: 100}}>
        <Text style={{color: 'black'}} numberOfLines={1}>
          Title: {item.title}
        </Text>
      </View>
      <View style={{flexWrap: 'wrap'}}>
        <Text style={{color: 'black', fontSize: 18}}>Category : </Text>
        {item.genres.map(item => (
          <Text style={{color: 'black'}}>{item}</Text>
        ))}
      </View>
      <View style={{backgroundColor: 'red', height: 30, alignSelf: 'right'}}>
        {showCheckBox && (
          <CheckBox
            disabled={false}
            value={checked}
            onValueChange={() => handleUserData(item?.title)}
          />
        )}
      </View>
    </View>
  );
};

export default CategoryWiseCard;

const styles = StyleSheet.create({});
