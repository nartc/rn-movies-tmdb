import React, { useContext } from 'react';
import { Card, Text } from 'react-native-elements';
import { StackScreenComponent } from '../utils/types';
import { FavoriteContext, favoriteContext } from '../contexts/FavoriteContext';
import { FlatList, TouchableOpacity, View } from 'react-native';
import CenterView from '../components/Shared/CenterView';
import { Movie } from '../api/Models';

type FavoriteMoviesProps = {};
const FavoriteMoviesScreen: StackScreenComponent<FavoriteMoviesProps> = ({ navigation }) => {
  const { state } = useContext(favoriteContext) as FavoriteContext;

  const onFavoritePressedHandler = (item: Movie) => {
    navigation.navigate({ routeName: 'Detail', params: { id: item.id } });
  };

  return (
    <View style={{ backgroundColor: '#2e286a', flex: 1 }}>
      {state.favorites.length ? (
        <FlatList data={state.favorites} keyExtractor={item => '' + item.id} renderItem={info => (
          <TouchableOpacity onPress={() => onFavoritePressedHandler(info.item)}>
            <Card image={{ uri: info.item.backdrop_path }}
                  containerStyle={{ backgroundColor: '#8d8bd1', borderColor: '#8d8bd1' }}>
              <Text h4Style={{ color: 'white' }} h4>{info.item.title}</Text>
              <Text style={{ color: 'white', marginTop: 10 }}>{info.item.overview}</Text>
            </Card>
          </TouchableOpacity>
        )}/>
      ) : (
        <CenterView>
          <Text style={{ color: 'white' }}>No favorites</Text>
        </CenterView>
      )}
    </View>
  );
};

FavoriteMoviesScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#3d3780'
  },
  headerTitleStyle: {
    color: 'white'
  }
};

export default FavoriteMoviesScreen;