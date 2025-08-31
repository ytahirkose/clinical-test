import { useState, useEffect, useRef } from 'react';
import { AD_FREQUENCY } from '../config/ads';

export const useAdFrequency = () => {
  const [canShowBanner, setCanShowBanner] = useState(true);
  const [canShowInterstitial, setCanShowInterstitial] = useState(true);
  const [adsShownThisSession, setAdsShownThisSession] = useState(0);
  
  const lastBannerTime = useRef<number>(0);
  const lastInterstitialTime = useRef<number>(0);

  // Check if we can show banner ad
  const canShowBannerAd = () => {
    const now = Date.now();
    const timeSinceLastBanner = now - lastBannerTime.current;
    
    return (
      canShowBanner &&
      timeSinceLastBanner >= AD_FREQUENCY.BANNER_MIN_INTERVAL &&
      adsShownThisSession < AD_FREQUENCY.MAX_ADS_PER_SESSION
    );
  };

  // Check if we can show interstitial ad
  const canShowInterstitialAd = () => {
    const now = Date.now();
    const timeSinceLastInterstitial = now - lastInterstitialTime.current;
    
    return (
      canShowInterstitial &&
      timeSinceLastInterstitial >= AD_FREQUENCY.INTERSTITIAL_MIN_INTERVAL &&
      adsShownThisSession < AD_FREQUENCY.MAX_ADS_PER_SESSION
    );
  };

  // Record banner ad shown
  const recordBannerAdShown = () => {
    lastBannerTime.current = Date.now();
    setAdsShownThisSession(prev => prev + 1);
    
    // Check if we've reached the limit
    if (adsShownThisSession >= AD_FREQUENCY.MAX_ADS_PER_SESSION) {
      setCanShowBanner(false);
    }
  };

  // Record interstitial ad shown
  const recordInterstitialAdShown = () => {
    lastInterstitialTime.current = Date.now();
    setAdsShownThisSession(prev => prev + 1);
    
    // Check if we've reached the limit
    if (adsShownThisSession >= AD_FREQUENCY.MAX_ADS_PER_SESSION) {
      setCanShowInterstitial(false);
    }
  };

  // Reset ad limits (e.g., when starting a new test)
  const resetAdLimits = () => {
    setCanShowBanner(true);
    setCanShowInterstitial(true);
    setAdsShownThisSession(0);
  };

  // Get current ad status
  const getAdStatus = () => ({
    canShowBanner: canShowBannerAd(),
    canShowInterstitial: canShowInterstitialAd(),
    adsShownThisSession,
    maxAdsPerSession: AD_FREQUENCY.MAX_ADS_PER_SESSION,
  });

  return {
    canShowBannerAd,
    canShowInterstitialAd,
    recordBannerAdShown,
    recordInterstitialAdShown,
    resetAdLimits,
    getAdStatus,
  };
};
