/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addBookmark,
  addLike,
  deleteBookmark,
  removeLike,
} from '../store/reducer/slice';

const MovieCard = ({item, activeCard, handleCardColor}) => {
  const likeResultArray = useSelector(state => state?.movieData?.likeResult);

  const bookmarkResultArray = useSelector(
    state => state.movieData.bookmarkResult,
  );
  const dispatch = useDispatch();
  const [likePressed, SetLikePressed] = useState(false);
  const [bookmarkPressed, setBookmarkPressed] = useState(false);

  const handleLike = () => {
    if (likePressed) {
      dispatch(removeLike(item));
    } else {
      dispatch(addLike(item));
    }
    SetLikePressed(prev => !prev);
  };
  const handleBookmark = () => {
    if (bookmarkPressed) {
      dispatch(deleteBookmark(item));
    } else {
      dispatch(addBookmark(item));
    }
    setBookmarkPressed(prev => !prev);
  };

  useEffect(() => {
    const isLikeStateTrue = likeResultArray.find(
      val => val.title === item.title,
    );
    console.log('like state', isLikeStateTrue);
    const isBookmarkStateTrue = bookmarkResultArray.find(
      val => val.title === item.title,
    );
    if (isLikeStateTrue) {
      SetLikePressed(true);
    }
    if (isBookmarkStateTrue) {
      setBookmarkPressed(true);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => handleCardColor(item)}
      style={{
        //id ka pass hona jaruri  hai tbhi us particular card ka pta lagega jiska bgc chnage krna hai
        //bcz parent component me bhot sare cards render hore hai  unme se kiska color change hona h  id ya index se hi  pta lag paega
        backgroundColor: activeCard === item ? '#BC8F8F' : '#c89666',
        margin: 10,
        width: 150,
        padding: 8,

        overflow: 'scroll',
      }}>
      <View style={{alignSelf: 'center'}}>
        <Image source={{uri: item?.posterUrl}} style={styles.ImgStyle} />
      </View>
      <Text numberOfLines={1} style={styles.text1}>
        Title : {item?.title ?? 'title'}
      </Text>
      <Text style={styles.text1}>
        Director : {item?.director ?? 'director'}
      </Text>
      <View style={{flexDirection: 'row', columnGap: 10, flexWrap: 'wrap'}}>
        <Text style={styles.text1}>genres : </Text>
        {item?.genres.map(item => (
          <Text style={styles.text1}> {item}</Text>
        ))}
      </View>
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity>
          <Ionicons
            name={likePressed ? 'heart' : 'heart-outline'}
            color="red"
            size={35}
            onPress={handleLike}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBookmark}>
          <Ionicons
            name={bookmarkPressed ? 'bookmark' : 'bookmark-outline'}
            color="blue"
            size={35}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  ImgStyle: {
    height: 100,
    width: 100,
    aspectRatio: 4 / 3,
  },

  text1: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Why Each Object Has Its Own Reference
// Even though movieList is a single reference to the array, each object within it ({ id: 1, ... }, { id: 2, ... }, etc.) is a separate object in memory with its own reference.
// When you iterate over movieList and pass item to a function, you are not passing a reference to movieList itself but to the individual object (item) in movieList.
// Thus, when you use item in setActiveCard, you are dealing with a reference to the specific object, not the array as a whole.
// Illustration with an Example
// To make this clear, let’s use an analogy:

// Imagine movieList as a list (an array) on a whiteboard. Each entry in that list is a sticky note (an object).
// The whiteboard itself has an address in your office (movieList reference), but each sticky note also has its own address (object references).
// When you point to a sticky note and say, "I’m talking about this sticky note" (item), you're referring to the specific sticky note, not the entire whiteboard.
// If you give the sticky note to someone (assign it to activeCard), they now have a reference to that specific sticky note.
// Key Takeaways
// Array Reference: The movieList variable holds a reference to the array.
// Object References: Each object inside movieList has its own reference, separate from the array reference.
// Passing Objects: When you pass an object like item from movieList, you are passing its reference, not creating a new object.
// Comparison with ===: activeCard === item checks if activeCard and item are the same reference (point to the same object in memory).
