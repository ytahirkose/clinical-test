import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

let BannerAd: any = null;
let BannerAdSize: any = null;
let TestIds: any = null;

try {
  const admobModule = require('react-native-google-mobile-ads');
  BannerAd = admobModule.BannerAd;
  BannerAdSize = admobModule.BannerAdSize;
  TestIds = admobModule.TestIds;
} catch (error) {
}

interface AdBannerProps {
  size?: any;
  position?: 'top' | 'bottom';
  screen?: 'home' | 'result';
  index?: number;
}

const AdBanner: React.FC<AdBannerProps> = ({
  size = BannerAdSize?.BANNER,
  position = 'bottom',
  screen = 'home',
  index = 0
}) => {
  const { t } = useTranslation();

  if (!BannerAd) {
    return (
      <View style={[
        styles.container,
        position === 'top' ? styles.topPosition : styles.bottomPosition,
        styles.webPlaceholder
      ]}>
        <View style={styles.placeholderContent}>
          <Text style={styles.placeholderText}>{t('ads.bannerPlaceholder')}</Text>
          <Text style={styles.placeholderSubtext}>{t('ads.webPlaceholder')}</Text>
        </View>
      </View>
    );
  }

  let adUnitId;
  if (__DEV__ && process.env.EXPO_PUBLIC_USE_TEST_ADS !== 'true' && TestIds) {
    switch (position) {
      case 'top':
        adUnitId = TestIds.BANNER;
        break;
      case 'bottom':
        adUnitId = TestIds.ADAPTIVE_BANNER;
        break;
      default:
        adUnitId = TestIds.BANNER;
    }
  } else {
    if (screen === 'home' && position === 'bottom') {
      adUnitId = 'ca-app-pub-2210682238674465/5434396058';
    } else if (screen === 'result' && position === 'top') {
      adUnitId = 'ca-app-pub-2210682238674465/9844683857';
    } else if (screen === 'result' && position === 'bottom') {
      if (index === 1) {
        adUnitId = 'ca-app-pub-2210682238674465/4554520077';
      } else {
        adUnitId = 'ca-app-pub-2210682238674465/5027201944';
      }
    } else {
      adUnitId = 'ca-app-pub-2210682238674465/5434396058';
    }
  }

  if (!BannerAd || !adUnitId) {
    return (
      <View style={[
        styles.container,
        position === 'top' ? styles.topPosition : styles.bottomPosition,
        styles.webPlaceholder
      ]}>
        <View style={styles.placeholderContent}>
          <Text style={styles.placeholderText}>{t('ads.bannerPlaceholder')}</Text>
          <Text style={styles.placeholderSubtext}>{t('ads.webPlaceholder')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      position === 'top' ? styles.topPosition : styles.bottomPosition
    ]}>
      <BannerAd
        unitId={adUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
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
  webPlaceholder: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderContent: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default AdBanner;
