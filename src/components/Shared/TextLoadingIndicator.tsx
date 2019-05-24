import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';

type TextLoadingIndicatorProps = {
  isVisible: boolean;
  text: string;
};
const TextLoadingIndicator: FC<TextLoadingIndicatorProps> = ({ isVisible, text }) => (
  <Overlay isVisible={isVisible}
           windowBackgroundColor={'rgba(0, 0, 0, 0)'}
           overlayBackgroundColor={'rgba(0, 0, 0, 0)'}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator/>
      <Text style={{ color: 'white' }}>{text}</Text>
    </View>
  </Overlay>
);

export default TextLoadingIndicator;