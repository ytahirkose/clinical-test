import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface NativeButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  variant?: 'contained' | 'outlined' | 'text';
  accessibilityLabel?: string;
}

const NativeButton: React.FC<NativeButtonProps> = ({
  children,
  onPress,
  disabled = false,
  style,
  textStyle,
  variant = 'contained',
  accessibilityLabel,
}) => {
  const theme = useTheme();

  const baseStyle: ViewStyle = {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyle: ViewStyle =
    variant === 'contained'
      ? { backgroundColor: theme.colors.primary }
      : variant === 'outlined'
      ? { borderWidth: 1, borderColor: theme.colors.outline, backgroundColor: 'transparent' }
      : { backgroundColor: 'transparent' };

  const textBase: TextStyle = {
    fontSize: 16,
    fontWeight: '600',
  };

  const textVariant: TextStyle =
    variant === 'contained'
      ? { color: theme.colors.onPrimary }
      : { color: theme.colors.primary };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        baseStyle,
        variantStyle,
        pressed && !disabled && variant === 'contained' ? { opacity: 0.9 } : null,
        pressed && !disabled && variant !== 'contained' ? { opacity: 0.6 } : null,
        style,
      ]}
    >
      <Text style={[textBase, textVariant, textStyle]}>{children}</Text>
    </Pressable>
  );
};

export default NativeButton;
