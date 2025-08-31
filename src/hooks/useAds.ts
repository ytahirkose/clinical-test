import { useState, useEffect } from 'react';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { getPlatformAdConfig, CONTENT_FILTERING_KEYWORDS } from '../config/ads';

export const useAds = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [interstitial, setInterstitial] = useState<InterstitialAd | null>(null);

  useEffect(() => {
    const adConfig = getPlatformAdConfig();
    const adUnitId = adConfig.interstitial;
    
    const newInterstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: CONTENT_FILTERING_KEYWORDS,
    });

    const unsubscribeLoaded = newInterstitial.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });

    const unsubscribeFailed = newInterstitial.addAdEventListener(AdEventType.ERROR, () => {
      setInterstitialLoaded(false);
    });

    const unsubscribeClosed = newInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setInterstitialLoaded(false);
      // Reklam kapandıktan sonra yeni reklam yükle
      newInterstitial.load();
    });

    setInterstitial(newInterstitial);

    // İlk reklamı yükle
    newInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeFailed();
      unsubscribeClosed();
    };
  }, []);

  const showInterstitialAd = () => {
    if (interstitial && interstitialLoaded) {
      interstitial.show();
      return true;
    }
    return false;
  };

  const loadInterstitialAd = () => {
    if (interstitial) {
      interstitial.load();
    }
  };

  return {
    interstitialLoaded,
    showInterstitialAd,
    loadInterstitialAd,
  };
};
