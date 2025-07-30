import colors from '@/theme/colors';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export default function GradientBackground({children, style}: {children: React.ReactNode; style?: ViewStyle;}) {
  return (
        <View style={[styles.container, style]}>
          {children}
        </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.secondary,
    
  },
  
});
