# AdMob Kurulum Rehberi - DEHB Detection

## 🚀 **AdMob Hesabı Oluşturma**

### **1. AdMob Console'a Giriş**
1. [AdMob Console](https://admob.google.com/) giriş yap
2. Google hesabı ile giriş yap
3. "Uygulama ekle" butonuna tıkla

### **2. Uygulama Ekleme**
1. **Uygulama adı:** DEHB Detection
2. **Platform:** iOS ve Android seç
3. **Kategori:** Health & Fitness
4. **Uygulama türü:** Mobile App

## 📱 **Platform Bazlı Kurulum**

### **iOS Kurulumu**
1. **Bundle ID:** `com.dehb.detection`
2. **App Store URL:** (henüz yok, placeholder kullan)
3. **App ID al:** `ca-app-pub-XXXXXXXXXXXX~YYYYYYYYYY`

### **Android Kurulumu**
1. **Package name:** `com.dehb.detection`
2. **Play Store URL:** (henüz yok, placeholder kullan)
3. **App ID al:** `ca-app-pub-XXXXXXXXXXXX~ZZZZZZZZZZ`

## 🎯 **Reklam Birimleri Oluşturma**

### **Banner Reklam**
1. **Reklam birimi türü:** Banner
2. **Ad unit name:** DEHB Detection - Banner
3. **Ad unit ID al:** `ca-app-pub-XXXXXXXXXXXX/YYYYYYYYYY`

### **Interstitial Reklam**
1. **Reklam birimi türü:** Interstitial
2. **Ad unit name:** DEHB Detection - Interstitial
3. **Ad unit ID al:** `ca-app-pub-XXXXXXXXXXXX/ZZZZZZZZZZ`

### **Rewarded Reklam (Opsiyonel)**
1. **Reklam birimi türü:** Rewarded
2. **Ad unit name:** DEHB Detection - Rewarded
3. **Ad unit ID al:** `ca-app-pub-XXXXXXXXXXXX/WWWWWWWWWW`

## ⚙️ **Kod Güncellemeleri**

### **1. Config Dosyasını Güncelle**
```typescript
// src/config/ads.ts
export const ADMOB_CONFIG = {
  production: {
    android: {
      appId: 'ca-app-pub-XXXXXXXXXXXX~YYYYYYYYYY', // Gerçek Android App ID
      banner: 'ca-app-pub-XXXXXXXXXXXX/YYYYYYYYYY', // Gerçek Banner ID
      interstitial: 'ca-app-pub-XXXXXXXXXXXX/ZZZZZZZZZZ', // Gerçek Interstitial ID
    },
    ios: {
      appId: 'ca-app-pub-XXXXXXXXXXXX~ZZZZZZZZZZ', // Gerçek iOS App ID
      banner: 'ca-app-pub-XXXXXXXXXXXX/AAAAAAAAAA', // Gerçek Banner ID
      interstitial: 'ca-app-pub-XXXXXXXXXXXX/BBBBBBBBBB', // Gerçek Interstitial ID
    },
  },
};
```

### **2. App.json Güncelle**
```json
{
  "expo": {
    "plugins": [
      [
        "expo-ads-admob",
        {
          "androidAppId": "ca-app-pub-XXXXXXXXXXXX~YYYYYYYYYY",
          "iosAppId": "ca-app-pub-XXXXXXXXXXXX~ZZZZZZZZZZ",
          "userTrackingPermission": "Bu uygulama, size daha iyi reklam deneyimi sunmak için reklam kimliği kullanır."
        }
      ]
    ]
  }
}
```

## 🔒 **İçerik Filtreleme**

### **Mevcut Filtreler**
- ✅ **Sağlık:** health, medical, psychology
- ✅ **Eğitim:** education, family, children
- ✅ **Gelişim:** development, wellness, parenting

### **Ek Filtreler (Opsiyonel)**
- **Yaş grubu:** 6+ yaş
- **İçerik türü:** Educational, Informational
- **Hedef kitle:** Parents, Healthcare professionals

## 📊 **Reklam Performansı**

### **Banner Reklamlar**
- **Yerleşim:** HomeScreen (alt), ResultScreen (üst+alt)
- **Boyut:** 320x50 (BANNER)
- **Frekans:** Her sayfa yüklendiğinde
- **Tahmini gelir:** Düşük ama sürekli

### **Interstitial Reklamlar**
- **Yerleşim:** Test sonuçları
- **Frekans:** Her 3-5 test sonrasında
- **Tahmini gelir:** Yüksek
- **Kullanıcı deneyimi:** Dikkatli kullan

## 🚨 **Önemli Notlar**

### **GDPR Uyumluluğu**
- ✅ **Non-personalized ads:** `servePersonalizedAds: false`
- ✅ **Content filtering:** Sağlık odaklı
- ✅ **User consent:** Privacy policy gerekli

### **App Store Onayı**
- ✅ **AdMob plugin:** Expo ile uyumlu
- ✅ **Content rating:** 4+ yaş
- ✅ **Privacy policy:** Gerekli

### **Google Play Store Onayı**
- ✅ **AdMob integration:** Native support
- ✅ **Content rating:** Everyone
- ✅ **Privacy policy:** Gerekli

## 🔧 **Test ve Debug**

### **Development Testing**
```bash
# Expo Go ile test
npm start

# Banner reklamları kontrol et
# Interstitial reklamları kontrol et
# Error handling kontrol et
```

### **Production Testing**
```bash
# EAS Build ile test
eas build --platform android --profile preview
eas build --platform ios --profile preview

# Gerçek cihazda test et
# Reklam yüklenme kontrolü
# Gelir raporları kontrolü
```

## 📈 **Gelir Optimizasyonu**

### **Banner Reklamlar**
- **Smart Banner:** Responsive tasarım
- **Ad refresh:** 30 saniye minimum
- **Placement:** Above the fold

### **Interstitial Reklamlar**
- **Timing:** Test tamamlandığında
- **Frequency:** Session başına max 3
- **User experience:** Intrusive olmamalı

## 🆘 **Troubleshooting**

### **Reklam Yüklenmiyor**
1. **Internet bağlantısı** kontrol et
2. **AdMob ID'leri** doğru mu?
3. **App Store/Play Store** onayı var mı?
4. **Test cihazı** whitelist'te mi?

### **Gelir Düşük**
1. **Ad placement** optimize et
2. **Content filtering** iyileştir
3. **User engagement** artır
4. **Ad refresh rate** ayarla

## 📞 **Destek**

### **AdMob Support**
- [AdMob Help Center](https://support.google.com/admob/)
- [AdMob Community](https://support.google.com/admob/community)
- [Technical Documentation](https://developers.google.com/admob)

### **Expo Support**
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Forums](https://forums.expo.dev/)
- [GitHub Issues](https://github.com/expo/expo/issues)
