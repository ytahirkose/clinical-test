import { useState, useEffect } from 'react';
import { AdMobInterstitial } from 'expo-ads-admob';
import { getPlatformAdConfig, CONTENT_FILTERING_KEYWORDS } from '../config/ads';

export const useAds = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    const adConfig = getPlatformAdConfig();
    const adUnitId = adConfig.interstitial;
    
    // AdMob Interstitial'ı ayarla
    AdMobInterstitial.setAdUnitID(adUnitId);

    // Event listener'ları ekle
    const handleLoad = () => {
      setInterstitialLoaded(true);
    };

    const handleFail = () => {
      setInterstitialLoaded(false);
    };

    const handleClose = () => {
      setInterstitialLoaded(false);
      // Reklam kapandıktan sonra yeni reklam yükle
      AdMobInterstitial.requestAdAsync({ 
        servePersonalizedAds: false,
        additionalRequestParams: {
          'kw': CONTENT_FILTERING_KEYWORDS.join(','),
          'npa': '1', // Non-personalized ads
        }
      });
    };

    AdMobInterstitial.addEventListener('interstitialDidLoad', handleLoad);
    AdMobInterstitial.addEventListener('interstitialDidFailToLoad', handleFail);
    AdMobInterstitial.addEventListener('interstitialDidClose', handleClose);

    // İlk reklamı yükle
    AdMobInterstitial.requestAdAsync({ 
      servePersonalizedAds: false,
      additionalRequestParams: {
        'kw': CONTENT_FILTERING_KEYWORDS.join(','),
        'npa': '1', // Non-personalized ads
      }
    });

    return () => {
      AdMobInterstitial.removeEventListener('interstitialDidLoad', handleLoad);
      AdMobInterstitial.removeEventListener('interstitialDidFailToLoad', handleFail);
      AdMobInterstitial.removeEventListener('interstitialDidClose', handleClose);
    };
  }, []);

  const showInterstitialAd = async () => {
    if (interstitialLoaded) {
      try {
        await AdMobInterstitial.showAdAsync();
        return true;
      } catch (error) {
        // Failed to show ad - handle silently in production
        if (__DEV__) {
          console.warn('Failed to show ad:', error);
        }
        return false;
      }
    }
    return false;
  };

  const loadInterstitialAd = () => {
    AdMobInterstitial.requestAdAsync({ 
      servePersonalizedAds: false,
      additionalRequestParams: {
        'kw': CONTENT_FILTERING_KEYWORDS.join(','),
        'npa': '1', // Non-personalized ads
      }
    });
  };

  return {
    interstitialLoaded,
    showInterstitialAd,
    loadInterstitialAd,
  };
};
