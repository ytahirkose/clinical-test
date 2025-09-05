import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

// Expo Go için AdMob mock'u
let BannerAd: any = null;
let BannerAdSize: any = null;
let TestIds: any = null;

try {
  const admobModule = require('react-native-google-mobile-ads');
  BannerAd = admobModule.BannerAd;
  BannerAdSize = admobModule.BannerAdSize;
  TestIds = admobModule.TestIds;
} catch (error) {
  console.log('AdMob not available in Expo Go');
}

interface AdBannerProps {
  size?: any; // BannerAdSize yerine any kullan
  position?: 'top' | 'bottom';
  screen?: 'home' | 'result';
  index?: number; // same position multiple banners
}

const AdBanner: React.FC<AdBannerProps> = ({
  size = BannerAdSize?.BANNER,
  position = 'bottom',
  screen = 'home',
  index = 0
}) => {
  const { t } = useTranslation();

  // Expo Go için placeholder, native için gerçek reklam
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

  // Test modunda test ID'leri, preview ve production'da gerçek ID'ler
  let adUnitId;
  if (__DEV__ && process.env.EXPO_PUBLIC_USE_TEST_ADS !== 'true' && TestIds) {
    // Sadece development modunda test ID'leri (preview hariç)
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
    // Production'da basit ID kullanımı
    if (screen === 'home' && position === 'bottom') {
      adUnitId = 'ca-app-pub-2210682238674465/5434396058';
    } else if (screen === 'result' && position === 'top') {
      adUnitId = 'ca-app-pub-2210682238674465/9844683857';
    } else if (screen === 'result' && position === 'bottom') {
      // There are two bottom banners on Result screen. Index 0 => first, 1 => second.
      if (index === 1) {
        adUnitId = 'ca-app-pub-2210682238674465/4554520077'; // NEW third banner id (second bottom position)
      } else {
        adUnitId = 'ca-app-pub-2210682238674465/5027201944';
      }
    } else {
      adUnitId = 'ca-app-pub-2210682238674465/5434396058';
    }
  }

  // BannerAd yoksa veya adUnitId yoksa placeholder göster
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
