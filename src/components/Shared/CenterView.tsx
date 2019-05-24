import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

const CenterView: FC<ViewProps> = props => (
  <View {...props} style={[{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, props.style]}>
    {props.children}
  </View>
);
export default CenterView;