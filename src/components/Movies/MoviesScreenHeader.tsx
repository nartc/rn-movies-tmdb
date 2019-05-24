import React, { FC, useState } from 'react';
import { Button, Icon, Input } from 'react-native-elements';
import { Animated, View } from 'react-native';

const AnimatableInput = Animated.createAnimatedComponent(Input);
const AnimatableButton = Animated.createAnimatedComponent(Button);

type MoviesScreenHeaderProps = {
  isSearching: boolean;
  toggleSearch: () => void;
};
const MoviesScreenHeader: FC<MoviesScreenHeaderProps> = ({ isSearching, toggleSearch }) => {

  const [opacity, _] = useState(new Animated.Value(0));

  const onToggle = () => {

    Animated.timing(opacity, {
      toValue: isSearching ? 0 : 1,
      duration: 250
    }).start();

    toggleSearch();
  };

  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      backgroundColor: '#3d3780'
    }}>
      <AnimatableInput placeholder={'Search Movies'}
                       placeholderTextColor={'white'}
                       containerStyle={{
                         flex: 1,
                         marginTop: 30,
                         borderColor: 'lightgray',
                         borderWidth: isSearching ? 1 : 0,
                         borderRadius: isSearching ? 20 : 0,
                         paddingHorizontal: 0,
                         width: isSearching ? 'auto' : 0,
                         height: isSearching ? 35 : 0,
                       }}
                       inputContainerStyle={{
                         borderBottomWidth: 0,
                         flex: 1,
                         alignItems: 'center',
                         justifyContent: 'space-between',
                         width: isSearching ? 'auto' : 0,
                         height: isSearching ? 'auto' : 0,
                       }}
                       inputStyle={{ marginLeft: 10, fontSize: 16 }}
                       leftIconStyle={{
                         width: isSearching ? 'auto' : 0,
                         height: isSearching ? 'auto' : 0,
                       }}
                       style={{ opacity }}/>
      {isSearching && (
        <AnimatableButton type={'clear'}
                          title={'Cancel'}
                          containerStyle={{
                            marginTop: 30,
                            marginLeft: 'auto'
                          }}
                          titleStyle={{ color: 'white' }}
                          onPress={onToggle}/>
      )}
      {!isSearching && (
        <Icon name={'ios-search'}
              type={'ionicon'}
              color={'white'}
              containerStyle={{ marginTop: 35, marginLeft: 'auto' }}
              onPress={onToggle}/>
      )}
    </View>
  );
};

export default MoviesScreenHeader;