import { Configuration } from '../api/Models';
import { createContext, Dispatch, Reducer, ReducerAction } from 'react';

export type ConfigurationContextState = {
  configuration?: Configuration;
};

export type ConfigurationContextActionTypes = 'SET_CONFIGURATION';

export type ConfigurationContextActions =
  { type: ConfigurationContextActionTypes }
  & Partial<ConfigurationContextState>;

export const configurationContextReducer: Reducer<ConfigurationContextState, ConfigurationContextActions> = (prevState, action) => {
  switch (action.type) {
    case 'SET_CONFIGURATION':
      return { ...prevState, configuration: action.configuration as Configuration };
    default:
      return prevState;
  }
};


export type ConfigurationContext = {
  state: ConfigurationContextState;
  dispatcher: Dispatch<ReducerAction<Reducer<ConfigurationContextState, ConfigurationContextActions>>>;
}

export const configurationContext = createContext<ConfigurationContext | null>(null);
