import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

let InterstitialAd: any = null;
let AdEventType: any = null;

try {
  const admobModule = require('react-native-google-mobile-ads');
  InterstitialAd = admobModule.InterstitialAd;
  AdEventType = admobModule.AdEventType;
} catch (error) {
}

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

  if (!InterstitialAd) {
    return null;
  }

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
      newInterstitial.load();
    });

    const unsubscribeFailed = newInterstitial.addAdEventListener(AdEventType.ERROR, (error: any) => {
      setLoaded(false);
      onAdFailedToLoad?.(error);
    });

    setInterstitial(newInterstitial);

    newInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeFailed();
    };
  }, [onAdClosed, onAdLoaded, onAdFailedToLoad]);

  const showAd = () => {
    if (!InterstitialAd) {
      return false;
    }

    if (interstitial && loaded) {
      interstitial.show();
      return true;
    } else {
      interstitial?.load();
      return false;
    }
  };

  return null;
};

let singletonInterstitial: any = null;
let singletonLoaded = false;

export const showRetakeInterstitial = async (): Promise<boolean> => {
  if (!InterstitialAd || !AdEventType) {
    return false;
  }

  const { interstitial: unitId } = getPlatformAdConfig();

  if (!singletonInterstitial) {
    singletonInterstitial = InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: CONTENT_FILTERING_KEYWORDS,
    });

    singletonInterstitial.addAdEventListener(AdEventType.LOADED, () => {
      singletonLoaded = true;
    });

    singletonInterstitial.addAdEventListener(AdEventType.ERROR, () => {
      singletonLoaded = false;
    });

    try { singletonInterstitial.load(); } catch {}
  }

  if (singletonLoaded) {
    try {
      await singletonInterstitial.show();
      singletonLoaded = false; // Will need reload next time
      try { singletonInterstitial.load(); } catch {}
      return true;
    } catch {
      return false;
    }
  }

  const waitFor = (ms: number) => new Promise(res => setTimeout(res, ms));
  try { singletonInterstitial.load(); } catch {}
  const maxWaitMs = 1500;
  const intervalMs = 100;
  let waited = 0;
  while (!singletonLoaded && waited < maxWaitMs) {
    await waitFor(intervalMs);
    waited += intervalMs;
  }

  if (singletonLoaded) {
    try {
      await singletonInterstitial.show();
      singletonLoaded = false;
      try { singletonInterstitial.load(); } catch {}
      return true;
    } catch {
      return false;
    }
  }

  return false;
};

export default InterstitialAdComponent;
