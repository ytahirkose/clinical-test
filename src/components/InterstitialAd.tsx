import React, { useEffect, useState } from 'react';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { getPlatformAdConfig, CONTENT_FILTERING_KEYWORDS } from '../config/ads';

interface InterstitialAdProps {
  onAdClosed?: () => void;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: any) => void;
}

const InterstitialAdComponent: React.FC<InterstitialAdProps> = ({
  onAdClosed,
  onAdLoaded,
  onAdFailedToLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [interstitial, setInterstitial] = useState<InterstitialAd | null>(null);

  useEffect(() => {
    const adConfig = getPlatformAdConfig();
    const adUnitId = adConfig.interstitial;
    
    const newInterstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: CONTENT_FILTERING_KEYWORDS,
    });

    const unsubscribeLoaded = newInterstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      onAdLoaded?.();
    });

    const unsubscribeClosed = newInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      onAdClosed?.();
      // Reklam kapandıktan sonra yeni reklam yükle
      newInterstitial.load();
    });

    const unsubscribeFailed = newInterstitial.addAdEventListener(AdEventType.ERROR, (error: any) => {
      setLoaded(false);
      onAdFailedToLoad?.(error);
    });

    setInterstitial(newInterstitial);

    // İlk reklamı yükle
    newInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeFailed();
    };
  }, [onAdClosed, onAdLoaded, onAdFailedToLoad]);

  const showAd = () => {
    if (interstitial && loaded) {
      interstitial.show();
      return true;
    } else {
      // Reklam yüklenmemişse yeni reklam yükle
      interstitial?.load();
      return false;
    }
  };

  // Component render etmez, sadece reklam yönetimi yapar
  return null;
};

export default InterstitialAdComponent;
