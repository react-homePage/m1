/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MovieDashboard from '../screen/MovieDashboard';
import CategoryScreen from '../screen/CategoryScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InfiniteScroll from '../screen/InfiniteScroll';

const TabContainer = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={MovieDashboard}
        options={{
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" size={size} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="category"
        component={CategoryScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="apps" size={size} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen name="infinite" component={InfiniteScroll} />
    </Tab.Navigator>
  );
};

export default TabContainer;

const styles = StyleSheet.create({});
