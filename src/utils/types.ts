import { NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation';

export type StackScreenComponent<TProps = {}, TParams = {}, TOptions = NavigationStackScreenOptions> = NavigationScreenComponent<TParams, TOptions, TProps>;