import React from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import MoviesScreen from '../screens/Movies';
import FavoriteMoviesScreen from '../screens/FavoriteMovies';
import MovieDetailScreen from '../screens/MovieDetail';
import { Icon } from 'react-native-elements';

const moviesStackNavigator = createStackNavigator({
  Movies: {
    screen: MoviesScreen
  },
  Detail: {
    screen: MovieDetailScreen
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Movies'
});

const favoriteStackNavigator = createStackNavigator({
  Favorite: {
    screen: FavoriteMoviesScreen
  }
}, {
  initialRouteName: 'Favorite',
  defaultNavigationOptions: {
    title: 'Favorite Movies'
  }
});

const mainTabNavigator = createBottomTabNavigator({
  MoviesStack: moviesStackNavigator,
  FavoriteStack: favoriteStackNavigator
}, {
  initialRouteName: 'MoviesStack',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#8d8bd1',
    style: {
      backgroundColor: '#3d3780'
    }
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName: string;
      if (routeName === 'MoviesStack') {
        iconName = 'ios-videocam';
      } else {
        iconName = 'ios-star';
      }

      return (
        <Icon name={iconName} color={tintColor as string} type={'ionicon'} size={28}/>
      );
    },
    tabBarLabel: navigation.state.routeName === 'MoviesStack' ? 'Movies' : 'Favorites'
  })
});

export const AppNavigator = createAppContainer(mainTabNavigator);
