import {Alert, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import MovieDashboard from '../screen/MovieDashboard';
import TabContainer from './TabContainer';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../store/reducer/slice';

const DrawerCustom = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="home"
        component={TabContainer}
        style={{backgroundColor: 'white'}}
        options={{
          headerTitle: 'Dashboard',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: {
            color: 'black',
          },
          drawerStyle: {
            backgroundColor: '#E6E6FA',
          },
        }}
      />

      {/* screens */}
    </Drawer.Navigator>
  );
};

export default DrawerCustom;

function CustomDrawerContent(props) {
  const token = useSelector(state => state.movieData.token);
  const dispatch = useDispatch();
  const [movieList, setMovieList] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const navigation = useNavigation();

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

  const handleCardClick = item => {
    if (activeCard === item) {
      setActiveCard(null);
    } else {
      setActiveCard(item);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          Alert.alert(
            'are you  sure',
            'you want to  Logout from App',
            [
              {
                text: 'Cancel',
                onPress: () => Alert.alert('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => dispatch(auth('')),
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  'This alert was dismissed by tapping outside of the alert dialog.',
                ),
            },
          );
        }}
      />
      {movieList.map((item, index) => (
        <View
          key={item}
          style={activeCard === item ? styles.activeStyle : null}>
          <DrawerItem
            label={item}
            onPress={() => {
              handleCardClick(item);
              navigation.navigate('categorywiseMovie', {categoryName: item});
            }}
          />
        </View>
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  activeStyle: {
    backgroundColor: '#e1b2db',
  },
});
