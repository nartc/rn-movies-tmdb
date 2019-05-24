import React, { useContext, useEffect, useState } from 'react';
import { StackScreenComponent } from '../utils/types';
import { ScrollView, StatusBar, View } from 'react-native';
import { Divider } from 'react-native-elements';
import MoviesList from '../components/Movies/MoviesList';
import MoviesScreenHeader from '../components/Movies/MoviesScreenHeader';
import { getConfiguration, getMovies } from '../api/Axios';
import { MovieContext, movieContext } from '../contexts/MovieContext';
import { ConfigurationContext, configurationContext } from '../contexts/ConfigurationContext';
import TextLoadingIndicator from '../components/Shared/TextLoadingIndicator';
import { getFavorites } from '../api/Favorite';
import { FavoriteContext, favoriteContext } from '../contexts/FavoriteContext';

type MoviesScreenProps = {};
const MoviesScreen: StackScreenComponent<MoviesScreenProps> = ({ navigation }) => {
  const { state, dispatcher } = useContext(movieContext) as MovieContext;
  const { dispatcher: configurationDispatcher } = useContext(configurationContext) as ConfigurationContext;
  const { dispatcher: favoriteDispatcher } = useContext(favoriteContext) as FavoriteContext;

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatcher({ type: 'SET_IS_LOADING', isLoading: true });

    Promise.all([
      getMovies('top_rated'),
      getMovies('upcoming'),
      getMovies('now_playing'),
      getMovies('popular'),
      getConfiguration(),
      getFavorites()
    ]).then(([topRated, upcoming, nowPlaying, popular, configuration, favorites]) => {
      dispatcher({ type: 'SET_NOW_PLAYING', nowPlaying });
      dispatcher({ type: 'SET_POPULAR', popular });
      dispatcher({ type: 'SET_TOP_RATED', topRated });
      dispatcher({ type: 'SET_UPCOMING', upcoming });
      configurationDispatcher({ type: 'SET_CONFIGURATION', configuration });
      favoriteDispatcher({ type: 'SET_FAVORITES', favorites });
      dispatcher({ type: 'SET_IS_LOADING', isLoading: false });
    });

  }, []);

  const onToggleSearch = () => {
    setIsSearching(prevState => !prevState);
  };

  const onMovieSelectedHandler = (id: number) => {
    navigation.navigate({ routeName: 'Detail', params: { id } });
  };

  return (
    <>
      <TextLoadingIndicator isVisible={state.isLoading} text={'Loading movies...'}/>
      <View style={{ flex: 1, backgroundColor: '#2e286a' }}>
        <StatusBar barStyle={'light-content'}/>
        <MoviesScreenHeader isSearching={isSearching} toggleSearch={onToggleSearch}/>
        <Divider/>
        <View style={{ flex: 7 }}>
          <ScrollView>
            {!state.isLoading && (
              <>
                <MoviesList movies={state.upcoming} title={'Upcoming'} onMovieSelected={onMovieSelectedHandler}/>
                <MoviesList movies={state.topRated} title={'Top Rated'} onMovieSelected={onMovieSelectedHandler}/>
                <MoviesList movies={state.nowPlaying} title={'Now Playing'} onMovieSelected={onMovieSelectedHandler}/>
                <MoviesList movies={state.popular} title={'Popular'} onMovieSelected={onMovieSelectedHandler}/>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default MoviesScreen;
