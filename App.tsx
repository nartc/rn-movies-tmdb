/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { FC, useReducer } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useScreens } from 'react-native-screens';
import { movieContext, movieContextReducer } from './src/contexts/MovieContext';
import { configurationContextReducer, configurationContext } from './src/contexts/ConfigurationContext';
import { AppNavigator } from './src/navigations/AppNavigator';
import { favoriteContextReducer, favoriteContext } from './src/contexts/FavoriteContext';

useScreens();


const App: FC = () => {
  const [movieContextState, movieContextDispatcher] = useReducer(movieContextReducer, {
    upcoming: [],
    popular: [],
    nowPlaying: [],
    topRated: [],
    isLoading: false
  });

  const [configurationContextState, configurationContextDispatcher] = useReducer(configurationContextReducer, {});

  const [favoriteContextState, favoriteContextDispatcher] = useReducer(favoriteContextReducer, {
    favorites: [],
    isLoading: false
  });

  return (
    <movieContext.Provider value={{
      state: movieContextState,
      dispatcher: movieContextDispatcher
    }}>
      <configurationContext.Provider value={{
        state: configurationContextState,
        dispatcher: configurationContextDispatcher
      }}>
        <favoriteContext.Provider value={{ state: favoriteContextState, dispatcher: favoriteContextDispatcher }}>
          <AppNavigator/>
        </favoriteContext.Provider>
      </configurationContext.Provider>
    </movieContext.Provider>
  );
};

export default App;