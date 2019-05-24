import AsyncStorage from '@react-native-community/async-storage';
import { Movie } from './Models';

export const favoriteStoreKey = '@favorites';

export const getFavorites = async () => {
  const resultString = await AsyncStorage.getItem(favoriteStoreKey);
  const results: Movie[] = resultString ? JSON.parse(resultString) : [];
  return results;
};

export const saveFavorites = async (favorites: Movie[]) => {
  await AsyncStorage.setItem(favoriteStoreKey, JSON.stringify(favorites));
};
