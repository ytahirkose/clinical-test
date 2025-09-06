import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

// AdMob mock for Expo Go
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

  // No ads in Expo Go
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
      // Load new ad after current one closes
      newInterstitial.load();
    });

    const unsubscribeFailed = newInterstitial.addAdEventListener(AdEventType.ERROR, (error: any) => {
      setLoaded(false);
      onAdFailedToLoad?.(error);
    });

    setInterstitial(newInterstitial);

    // Load first ad
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
      // Load new ad if current one not loaded
      interstitial?.load();
      return false;
    }
  };

  // Component doesn't render, only manages ads
  return null;
};

// Simple singleton helper to show interstitial on demand (e.g., Retake)
let singletonInterstitial: any = null;
let singletonLoaded = false;

export const showRetakeInterstitial = async (): Promise<boolean> => {
  // If module not available (Expo Go), do nothing
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

    // Preload
    try { singletonInterstitial.load(); } catch {}
  }

  // If already loaded, show immediately
  if (singletonLoaded) {
    try {
      await singletonInterstitial.show();
      singletonLoaded = false; // Will need reload next time
      // Preload next
      try { singletonInterstitial.load(); } catch {}
      return true;
    } catch {
      return false;
    }
  }

  // Not loaded yet: try a short wait for load, else fail fast
  const waitFor = (ms: number) => new Promise(res => setTimeout(res, ms));
  // Trigger load just in case
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
