import colors from '@/theme/colors';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  center?: boolean;
};

export default function Background({ children, style, center = false }: BackgroundProps) {
  return (
    <SafeAreaView style={[styles.container, center && styles.centered, style]}>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
