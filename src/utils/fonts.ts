import { Platform } from 'react-native';

export const theme = {
  fontFamily: Platform.select({
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ios: 'System',
    android: 'Roboto',
    default: 'System'
  })
};
