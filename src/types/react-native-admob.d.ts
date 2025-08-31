declare module 'react-native-admob' {
  export enum BannerAdSize {
    BANNER = 'BANNER',
    LARGE_BANNER = 'LARGE_BANNER',
    MEDIUM_RECTANGLE = 'MEDIUM_RECTANGLE',
    FULL_BANNER = 'FULL_BANNER',
    LEADERBOARD = 'LEADERBOARD',
    SKYSCRAPER = 'SKYSCRAPER',
    SMART_BANNER = 'SMART_BANNER',
  }

  export enum AdEventType {
    LOADED = 'loaded',
    ERROR = 'error',
    CLOSED = 'closed',
    OPENED = 'opened',
    CLICKED = 'clicked',
    IMPRESSION = 'impression',
  }

  export const TestIds: {
    BANNER: string;
    INTERSTITIAL: string;
    REWARDED: string;
    REWARDED_INTERSTITIAL: string;
    APP_OPEN: string;
  };

  export interface BannerAdProps {
    unitId: string;
    size: BannerAdSize;
    requestOptions?: {
      requestNonPersonalizedAdsOnly?: boolean;
      keywords?: string[];
      maxAdContentRating?: string;
      tagForChildDirectedTreatment?: boolean;
      tagForUnderAgeOfConsent?: boolean;
    };
    onAdLoaded?: () => void;
    onAdFailedToLoad?: (error: any) => void;
    onAdOpened?: () => void;
    onAdClosed?: () => void;
    onAdClicked?: () => void;
    onAdImpression?: () => void;
  }

  export interface InterstitialAdProps {
    unitId: string;
    requestOptions?: {
      requestNonPersonalizedAdsOnly?: boolean;
      keywords?: string[];
      maxAdContentRating?: string;
      tagForChildDirectedTreatment?: boolean;
      tagForUnderAgeOfConsent?: boolean;
    };
    onAdLoaded?: () => void;
    onAdFailedToLoad?: (error: any) => void;
    onAdOpened?: () => void;
    onAdClosed?: () => void;
    onAdClicked?: () => void;
    onAdImpression?: () => void;
  }

  export class BannerAd extends React.Component<BannerAdProps> {}

  export class InterstitialAd {
    static createForAdRequest(
      unitId: string,
      requestOptions?: {
        requestNonPersonalizedAdsOnly?: boolean;
        keywords?: string[];
        maxAdContentRating?: string;
        tagForChildDirectedTreatment?: boolean;
        tagForUnderAgeOfConsent?: boolean;
      }
    ): InterstitialAd;

    addAdEventListener(eventType: AdEventType, listener: (event?: any) => void): () => void;
    load(): void;
    show(): Promise<void>;
    isLoaded(): boolean;
  }
}
