import colors from '@/theme/colors';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GradientBackground({children, style}: {children: React.ReactNode; style?: ViewStyle;}) {
  return (
        <SafeAreaView style={[styles.container, style]}>
          {children}
        </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.secondary,
    
  },
  
});
