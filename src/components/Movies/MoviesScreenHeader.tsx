import React, { FC, useRef, useState } from 'react';
import { Button, Icon, Input } from 'react-native-elements';
import { Animated, View } from 'react-native';

type MoviesScreenHeaderProps = {
  isSearching: boolean;
  toggleSearch: () => void;
};
const MoviesScreenHeader: FC<MoviesScreenHeaderProps> = ({ isSearching, toggleSearch }) => {
  const searchIconRight = useRef(new Animated.Value(20));
  const searchIconOpacity = searchIconRight.current.interpolate({
    inputRange: [-20, 20],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  const searchOpacity = searchIconOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });
  const searchInputWidth = searchIconOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const onToggle = () => {
    Animated.timing(searchIconRight.current, {
      toValue: isSearching ? 20 : -20,
      duration: 400
    }).start();

    toggleSearch();
  };

  return (
    <View style={ {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      backgroundColor: '#3d3780'
    } }>
      <Animated.View style={ {
        flex: searchInputWidth,
        marginTop: 30,
        borderRadius: 20,
        borderColor: '#ddd',
        borderWidth: 1,
        opacity: searchOpacity
      } }>
        <Input placeholderTextColor={ 'white' }
               placeholder={ 'Search movies...' }
               underlineColorAndroid={ 'transparent' }
               inputContainerStyle={ { borderBottomWidth: 0 } }/>
      </Animated.View>
      <Animated.View style={ { opacity: searchOpacity, marginTop: 30 } }>
        <Button title={ 'Cancel' }
                type={ 'clear' }
                titleStyle={ { color: 'white' } }
                onPress={ onToggle }/>
      </Animated.View>
      <Animated.View style={ {
        position: 'absolute',
        right: searchIconRight.current,
        top: 50,
        opacity: searchIconOpacity
      } }>
        <Icon name={ 'ios-search' }
              type={ 'ionicon' }
              color={ 'white' }
              onPress={ onToggle }/>
      </Animated.View>
    </View>
  );
};

export default MoviesScreenHeader;
