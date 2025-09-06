import { Platform } from 'react-native';

export const TEST_IDS = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917'
};

export const ADMOB_CONFIG = {
  test: {
    android: {
      appId: 'ca-app-pub-3940256099942544~3347511713',
      banner: TEST_IDS.BANNER,
      interstitial: TEST_IDS.INTERSTITIAL,
      rewarded: TEST_IDS.REWARDED,
    },
    ios: {
      appId: 'ca-app-pub-3940256099942544~1458002511',
      banner: TEST_IDS.BANNER,
      interstitial: TEST_IDS.INTERSTITIAL,
      rewarded: TEST_IDS.REWARDED,
    },
  },
  production: {
    android: {
      appId: 'ca-app-pub-2210682238674465~1739007060',
      banner: 'ca-app-pub-2210682238674465/5434396058',
      interstitial: 'ca-app-pub-2210682238674465/6422135510',
      rewarded: 'ca-app-pub-2210682238674465/5027201944',
    },
    ios: {
      appId: 'ca-app-pub-2210682238674465~1686722737',
      banner: 'ca-app-pub-2210682238674465/5434396058',
      interstitial: 'ca-app-pub-2210682238674465/6515287246',
      rewarded: 'ca-app-pub-2210682238674465/5027201944',
    },
  },
};

export const getAdMobConfig = () => {
  if (__DEV__) {
    return ADMOB_CONFIG.test;
  }
  return ADMOB_CONFIG.production;
};

export const getPlatformAdConfig = () => {
  const config = getAdMobConfig();
  if (Platform.OS === 'ios') {
    return config.ios;
  }
  return config.android;
};

export const BANNER_SIZES = {
  BANNER: 'BANNER',
  LARGE_BANNER: 'LARGE_BANNER',
  MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE',
  FULL_BANNER: 'FULL_BANNER',
  LEADERBOARD: 'LEADERBOARD',
  ADAPTIVE_BANNER: 'ADAPTIVE_BANNER',
  ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
};

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

export const AD_REQUEST_OPTIONS = {
  requestNonPersonalizedAdsOnly: true,
  keywords: CONTENT_FILTERING_KEYWORDS,
  maxAdContentRating: 'G',
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true
};

export const AD_FREQUENCY = {
  BANNER_MIN_INTERVAL: 30000, // 30 seconds
  INTERSTITIAL_MIN_INTERVAL: 300000, // 5 minutes
  MAX_ADS_PER_SESSION: 10,
  MAX_BANNERS_PER_SCREEN: 2,
};
