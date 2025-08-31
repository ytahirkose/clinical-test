import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { getPlatformAdConfig, BANNER_SIZES, CONTENT_FILTERING_KEYWORDS } from '../config/ads';

interface AdBannerProps {
  size?: keyof typeof BANNER_SIZES;
  position?: 'top' | 'bottom';
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  size = 'BANNER', 
  position = 'bottom' 
}) => {
  const adConfig = getPlatformAdConfig();
  const adUnitId = adConfig.banner;

  return (
    <View style={[
      styles.container, 
      position === 'top' ? styles.topPosition : styles.bottomPosition
    ]}>
      <AdMobBanner
        bannerSize={BANNER_SIZES[size]}
        adUnitID={adUnitId}
        servePersonalizedAds={false}
        additionalRequestParams={{
          // Content filtering
          'kw': CONTENT_FILTERING_KEYWORDS.join(','),
          'npa': '1', // Non-personalized ads
        }}
        onDidFailToReceiveAdWithError={(error: any) => {
          // Ad failed to load - handle silently in production
          if (__DEV__) {
            console.warn('Ad failed to load:', error);
          }
        }}
        onAdViewDidReceiveAd={() => {
          // Ad loaded successfully - handle silently in production
          if (__DEV__) {
            console.info('Ad loaded successfully');
          }
        }}
        onAdViewWillPresentScreen={() => {
          // Ad opened - handle silently in production
          if (__DEV__) {
            console.info('Ad opened');
          }
        }}
        onAdViewWillDismissScreen={() => {
          // Ad closed - handle silently in production
          if (__DEV__) {
            console.info('Ad closed');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  topPosition: {
    marginTop: 10,
    marginBottom: 10,
  },
  bottomPosition: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AdBanner;
