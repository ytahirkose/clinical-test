import { Platform } from 'react-native';

// AdMob Configuration
export const ADMOB_CONFIG = {
  // Test IDs (Development)
  test: {
    android: {
      appId: 'ca-app-pub-3940256099942544~3347511713',
      banner: 'ca-app-pub-3940256099942544/6300978111',
      interstitial: 'ca-app-pub-3940256099942544/1033173712',
      rewarded: 'ca-app-pub-3940256099942544/5224354917',
    },
    ios: {
      appId: 'ca-app-pub-3940256099942544~1458002511',
      banner: 'ca-app-pub-3940256099942544/2934735716',
      interstitial: 'ca-app-pub-3940256099942544/4411468910',
      rewarded: 'ca-app-pub-3940256099942544/1712485313',
    },
  },
  // Production IDs (Replace with your real AdMob IDs)
  production: {
    android: {
      appId: 'ca-app-pub-XXXXXXXXXXXX~YYYYYYYYYY', // TODO: Replace with real Android App ID
      banner: 'ca-app-pub-XXXXXXXXXXXX/YYYYYYYYYY', // TODO: Replace with real Banner ID
      interstitial: 'ca-app-pub-XXXXXXXXXXXX/ZZZZZZZZZZ', // TODO: Replace with real Interstitial ID
      rewarded: 'ca-app-pub-XXXXXXXXXXXX/WWWWWWWWWW', // TODO: Replace with real Rewarded ID
    },
    ios: {
      appId: 'ca-app-pub-XXXXXXXXXXXX~ZZZZZZZZZZ', // TODO: Replace with real iOS App ID
      banner: 'ca-app-pub-XXXXXXXXXXXX/AAAAAAAAAA', // TODO: Replace with real Banner ID
      interstitial: 'ca-app-pub-XXXXXXXXXXXX/BBBBBBBBBB', // TODO: Replace with real Interstitial ID
      rewarded: 'ca-app-pub-XXXXXXXXXXXX/CCCCCCCCCC', // TODO: Replace with real Rewarded ID
    },
  },
};

// Get current environment
export const getAdMobConfig = () => {
  if (__DEV__) {
    return ADMOB_CONFIG.test;
  }
  return ADMOB_CONFIG.production;
};

// Get platform-specific config
export const getPlatformAdConfig = () => {
  const config = getAdMobConfig();
  if (Platform.OS === 'ios') {
    return config.ios;
  }
  return config.android;
};

// Banner sizes
export const BANNER_SIZES = {
  BANNER: 'banner' as const,
  LARGE_BANNER: 'largeBanner' as const,
  MEDIUM_RECTANGLE: 'mediumRectangle' as const,
  FULL_BANNER: 'fullBanner' as const,
  LEADERBOARD: 'leaderboard' as const,
  SMART_BANNER_PORTRAIT: 'smartBannerPortrait' as const,
  SMART_BANNER_LANDSCAPE: 'smartBannerLandscape' as const,
};

// Content filtering keywords
export const CONTENT_FILTERING_KEYWORDS = [
  'health',
  'medical', 
  'education',
  'family',
  'children',
  'psychology',
  'mental-health',
  'wellness',
  'parenting',
  'development'
];

// Ad frequency control
export const AD_FREQUENCY = {
  BANNER_MIN_INTERVAL: 30000, // 30 seconds
  INTERSTITIAL_MIN_INTERVAL: 300000, // 5 minutes
  MAX_ADS_PER_SESSION: 10,
  MAX_BANNERS_PER_SCREEN: 2,
};
