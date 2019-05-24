import React, { useContext, useEffect, useRef } from 'react';
import { StackScreenComponent } from '../utils/types';
import { ActivityIndicator, Dimensions, ScrollView, View, Text, FlatList, Linking } from 'react-native';
import { getMovieById } from '../api/Axios';
import { Button, Divider, Image } from 'react-native-elements';
import { MovieContext, movieContext } from '../contexts/MovieContext';
import { ConfigurationContext, configurationContext } from '../contexts/ConfigurationContext';
import { Cast, MovieImage, MovieVideoSite, MovieVideoType, Videos, MovieDetail } from '../api/Models';
import TextLoadingIndicator from '../components/Shared/TextLoadingIndicator';
import MoviesList from '../components/Movies/MoviesList';
import { FavoriteContext, favoriteContext } from '../contexts/FavoriteContext';
import { saveFavorites } from '../api/Favorite';
import { NavigationEventPayload, NavigationEvents } from 'react-navigation';

const MovieDetailScreen: StackScreenComponent<{}, { id: number }> = ({ navigation }) => {
  const { state: { isLoading, selected }, dispatcher } = useContext(movieContext) as MovieContext;
  const { state: { configuration } } = useContext(configurationContext) as ConfigurationContext;
  const { state: { favorites }, dispatcher: favoriteContextDispatcher } = useContext(favoriteContext) as FavoriteContext;

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    dispatcher({ type: 'SET_IS_LOADING', isLoading: true });
    const id = navigation.getParam('id');
    getMovieById('' + id).then(movie => {
      dispatcher({ type: 'SET_SELECTED', selected: movie });
      dispatcher({ type: 'SET_IS_LOADING', isLoading: false });
    });

    return () => {
      dispatcher({ type: 'SET_SELECTED', selected: undefined });
    };
  }, []);

  const isSelectedFavorited = () => {
    return favorites.some(f => f.id === (selected as MovieDetail).id);
  };

  const getImageUri = () => {
    if (selected) {
      const filteredPosters = selected.images.posters.filter(p => p.iso_639_1 === 'en' && p.height > 1280);
      return configuration
        ? `${configuration.images.secure_base_url}${configuration.images.backdrop_sizes.find(s => s === 'original')}${filteredPosters.length
          ? filteredPosters[filteredPosters.length - 1].file_path
          : selected.poster_path}`
        : '';
    }

    return '';
  };

  const fullWidth = Dimensions.get('window').width;

  const getProfileUri = (c: Cast) => {
    return configuration
      ? `${configuration.images.secure_base_url}${configuration.images.profile_sizes.find(s => s === 'original')}${c.profile_path}`
      : '';
  };

  const getBackdropUri = (item: MovieImage) => {
    return configuration
      ? `${configuration.images.secure_base_url}${configuration.images.backdrop_sizes.find(s => s === 'original')}${item.file_path}`
      : '';
  };

  const onWatchTrailerPressedHandler = (videos: Videos) => {
    const selectedVideo = videos.results.find(v => v.type === MovieVideoType.Trailer && v.site === MovieVideoSite.Youtube);
    const key = selectedVideo ? selectedVideo.key : '';
    Linking.openURL(`https://www.youtube.com/watch?v=${key}`);
  };

  const onMovieSelected = (movieId: number) => {
    navigation.replace('Detail', { id: movieId });
  };

  const onAddToFavoritePressedHandler = (movie: MovieDetail) => {
    const backdrop = movie.images.backdrops.find(bd => (!bd.iso_639_1 || bd.iso_639_1 === 'en') && bd.height > 1280) as MovieImage;
    const favorite = { ...movie, backdrop_path: getBackdropUri(backdrop) };
    const updatedFavorites = [...favorites, favorite];
    favoriteContextDispatcher({ type: 'SET_FAVORITES', favorites: updatedFavorites });
    saveFavorites(updatedFavorites);
  };

  const onRemoveFavoritePressedHandler = (movie: MovieDetail) => {
    const updatedFavorites = favorites.filter(f => f.id !== movie.id);
    favoriteContextDispatcher({ type: 'SET_FAVORITES', favorites: updatedFavorites });
    saveFavorites(updatedFavorites);
  };

  const onWillFocusHandler = (payload: NavigationEventPayload) => {
    const lastId = payload.lastState ? payload.lastState.params['id'] : null;
    const currentId = payload.lastState ? payload.state.params['id'] : null;

    if (lastId !== null && currentId !== lastId) {
      dispatcher({ type: 'SET_IS_LOADING', isLoading: true });
      getMovieById('' + currentId).then(movie => {
        dispatcher({ type: 'SET_SELECTED', selected: movie });
        dispatcher({ type: 'SET_IS_LOADING', isLoading: false });

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
      });
    }
  };

  return (
    <>
      <NavigationEvents onWillFocus={onWillFocusHandler}/>
      <TextLoadingIndicator isVisible={isLoading} text={'Loading movie...'}/>
      <View style={{ flex: 1, backgroundColor: '#2e286a' }}>
        {selected && (
          <ScrollView ref={scrollViewRef}>
            <Image source={{ uri: getImageUri() }}
                   style={{ width: fullWidth, height: 562 }}
                   PlaceholderContent={<ActivityIndicator/>}
                   resizeMethod={'scale'}
                   resizeMode={'stretch'}/>
            <View style={{ flex: 1 }}>
              <Text style={{
                paddingHorizontal: 10,
                paddingTop: 10,
                color: 'white',
                fontSize: 20
              }}>{selected.original_title}</Text>
              <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, paddingTop: 5 }}>
                {selected.genres.map((g, index) => (
                  <Text style={{ color: 'white', fontSize: 12 }}
                        key={g.id}>{g.name}{index === selected.genres.length - 1 ? '' : ', '}</Text>
                ))}
              </View>
            </View>
            <Text style={{
              color: 'white',
              fontSize: 12,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
              {selected.overview}
            </Text>
            <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row' }}>
              <Button raised
                      title={'Watch Trailer'}
                      icon={{ name: 'ios-glasses', type: 'ionicon', color: 'white', size: 24 }}
                      containerStyle={{ marginRight: 5, alignItems: 'center' }}
                      buttonStyle={{ backgroundColor: '#00d97e', borderRadius: 10 }}
                      titleStyle={{ fontSize: 12 }}
                      onPress={() => onWatchTrailerPressedHandler(selected.videos)}/>
              {isSelectedFavorited() ? (
                <Button raised
                        icon={{ name: 'ios-heart-empty', type: 'ionicon', color: 'white', size: 24 }}
                        containerStyle={{ marginRight: 5, alignItems: 'center' }}
                        buttonStyle={{ backgroundColor: '#a6aacc', borderRadius: 10 }}
                        titleStyle={{ fontSize: 12 }}
                        title={'Remove from Favorite'}
                        onPress={() => onRemoveFavoritePressedHandler(selected)}/>
              ) : (
                <Button raised
                        icon={{ name: 'ios-heart', type: 'ionicon', color: 'white', size: 24 }}
                        containerStyle={{ marginRight: 5, alignItems: 'center' }}
                        buttonStyle={{ backgroundColor: '#ff386a', borderRadius: 10 }}
                        titleStyle={{ fontSize: 12 }}
                        title={'Add to Favorite'}
                        onPress={() => onAddToFavoritePressedHandler(selected)}/>
              )}
            </View>
            <View style={{ padding: 20 }}>
              <Divider/>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView horizontal>
                {selected.credits.cast.map(c => (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 100 }} key={c.id}>
                    <Image source={{ uri: getProfileUri(c) }}
                           style={{ width: 50, height: 75 }}
                           resizeMode={'cover'}
                           resizeMethod={'auto'}/>
                    <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>{c.name}</Text>
                    <Text style={{ color: 'white', fontSize: 8 }}>as</Text>
                    <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>{c.character}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={{ padding: 20 }}>
              <Divider/>
            </View>
            <View>
              <FlatList data={selected.images.backdrops}
                        numColumns={2}
                        keyExtractor={(_, index) => '' + index}
                        renderItem={info => (
                          <Image source={{ uri: getBackdropUri(info.item) }}
                                 style={{ width: fullWidth / 2, height: fullWidth / 2 }}
                                 PlaceholderContent={<ActivityIndicator/>}
                                 resizeMethod={'resize'}
                                 resizeMode={'cover'}/>
                        )}/>
            </View>
            <View style={{ padding: 20 }}>
              <Divider/>
            </View>
            <MoviesList movies={selected.recommendations.results}
                        title={'Recommendations'}
                        onMovieSelected={onMovieSelected}/>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default MovieDetailScreen;