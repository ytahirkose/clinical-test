import React, { useEffect, useState } from 'react';
import { AdMobInterstitial } from 'expo-ads-admob';
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

  useEffect(() => {
    const adConfig = getPlatformAdConfig();
    const adUnitId = adConfig.interstitial;
    
    // AdMob Interstitial'ı ayarla
    AdMobInterstitial.setAdUnitID(adUnitId);

    // Event listener'ları ekle
    const handleLoad = () => {
      setLoaded(true);
      onAdLoaded?.();
    };

    const handleFail = (error: any) => {
      setLoaded(false);
      onAdFailedToLoad?.(error);
    };

    const handleClose = () => {
      setLoaded(false);
      onAdClosed?.();
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
  }, [onAdClosed, onAdLoaded, onAdFailedToLoad]);

  const showAd = async () => {
    if (loaded) {
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
    } else {
      // Reklam yüklenmemişse yeni reklam yükle
      AdMobInterstitial.requestAdAsync({ 
        servePersonalizedAds: false,
        additionalRequestParams: {
          'kw': CONTENT_FILTERING_KEYWORDS.join(','),
          'npa': '1', // Non-personalized ads
        }
      });
      return false;
    }
  };

  // Component render etmez, sadece reklam yönetimi yapar
  return null;
};

export default InterstitialAdComponent;
