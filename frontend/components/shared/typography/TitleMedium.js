import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import theme from '../../../theme';

const TitleMedium = ({ children, ...props }) => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line no-undef
    'Calistoga-Regular': require('../../../assets/Calistoga-Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text
        {...props}
        style={{ fontFamily: 'Calistoga-Regular', fontSize: 16, color: theme.colors.primary}}
      >
        {children}
      </Text>
    </View>
  );
};

export default TitleMedium;
