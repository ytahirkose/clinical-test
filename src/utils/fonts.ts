import { Platform } from 'react-native';

export const theme = {
  fontFamily: Platform.select({
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ios: 'System',
    android: 'Roboto',
    default: 'System'
  }),

  colors: {
    primary: '#1890af',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    text: {
      primary: '#262626',
      secondary: '#595959'
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5'
    }
  }
};

export const getTextStyle = (size: number = 16, weight: 'normal' | 'bold' | '600' = 'normal', color?: string) => ({
  fontSize: size,
  fontWeight: weight,
  fontFamily: theme.fontFamily,
  color: color || theme.colors.text.primary
});

export const getHeadingStyle = (size: number = 24, weight: 'normal' | 'bold' | '600' = 'bold', color?: string) => ({
  fontSize: size,
  fontWeight: weight,
  fontFamily: theme.fontFamily,
  color: color || theme.colors.primary,
  textAlign: 'center' as const
});
