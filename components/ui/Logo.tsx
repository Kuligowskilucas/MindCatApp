import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';

type AppLogoProps = {
  style?: ImageStyle | ImageStyle[];
};

export default function AppLogo({ style }: AppLogoProps) {
  return (
    <Image source={require('@/assets/images/homepage/icone.png')} resizeMode="contain" style={[styles.logo, style]}/>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
});
