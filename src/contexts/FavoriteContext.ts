import { Movie } from '../api/Models';
import { createContext, Dispatch, Reducer, ReducerAction } from 'react';

export type FavoriteContextState = {
  favorites: Movie[];
  isLoading: boolean;
};

export type FavoriteContextActionTypes = 'SET_FAVORITES' | 'SET_IS_LOADING';

export type FavoriteContextActions = { type: FavoriteContextActionTypes } & Partial<FavoriteContextState>;

export const favoriteContextReducer: Reducer<FavoriteContextState, FavoriteContextActions> = (prevState, action) => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return { ...prevState, isLoading: action.isLoading as boolean };
    case 'SET_FAVORITES':
      return { ...prevState, favorites: [...action.favorites as Movie[]] };
    default:
      return prevState;
  }
};

export type FavoriteContext = {
  state: FavoriteContextState;
  dispatcher: Dispatch<ReducerAction<Reducer<FavoriteContextState, FavoriteContextActions>>>;
};

export const favoriteContext = createContext<FavoriteContext | null>(null);
