import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
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
      <BannerAd
        unitId={adUnitId}
        size={BANNER_SIZES[size]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          keywords: CONTENT_FILTERING_KEYWORDS,
        }}
        onAdLoaded={() => {
          if (__DEV__) {
            console.info('Ad loaded successfully');
          }
        }}
        onAdFailedToLoad={(error) => {
          if (__DEV__) {
            console.warn('Ad failed to load:', error);
          }
        }}
        onAdOpened={() => {
          if (__DEV__) {
            console.info('Ad opened');
          }
        }}
        onAdClosed={() => {
          if (__DEV__) {
            console.info('Ad closed');
          }
        }}
        onAdClicked={() => {
          if (__DEV__) {
            console.info('Ad clicked');
          }
        }}
        onAdImpression={() => {
          if (__DEV__) {
            console.info('Ad impression');
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
