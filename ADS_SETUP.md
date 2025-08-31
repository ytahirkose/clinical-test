# Reklam Kurulum Rehberi - DEHB Detection

## 📱 **Reklam Türleri ve Yerleşimi**

### **1. Banner Reklamlar (Önerilen)**
- **Yerleşim:** Sayfa üstü ve altı
- **Boyut:** 320x50 (BANNER) veya 320x100 (LARGE_BANNER)
- **Sıklık:** Her sayfada 1-2 adet
- **Gelir:** Düşük ama sürekli

### **2. Interstitial Reklamlar (Tam Ekran)**
- **Yerleşim:** Test sonuçları, sayfa geçişleri
- **Sıklık:** Her 3-5 test sonrasında
- **Gelir:** Yüksek ama kullanıcı deneyimini etkileyebilir
- **Önerilen:** Sadece test tamamlandığında

### **3. Rewarded Reklamlar (Ödüllü)**
- **Yerleşim:** Ek test sonuçları, detaylı analiz
- **Sıklık:** İsteğe bağlı
- **Gelir:** Orta-yüksek
- **Kullanıcı Deneyimi:** Pozitif (ödül var)

## 🔧 **Kurulum Adımları**

### **1. AdMob Hesabı Oluştur**
1. [AdMob Console](https://admob.google.com/) giriş yap
2. Yeni uygulama ekle
3. Platform seç (iOS/Android)
4. App ID'leri al

### **2. Reklam Birimleri Oluştur**
```bash
# Banner Reklam
Banner Ad Unit ID: ca-app-pub-XXXXXXXXXXXX/YYYYYYYYYY

# Interstitial Reklam
Interstitial Ad Unit ID: ca-app-pub-XXXXXXXXXXXX/ZZZZZZZZZZ

# Rewarded Reklam
Rewarded Ad Unit ID: ca-app-pub-XXXXXXXXXXXX/WWWWWWWWWW
```

### **3. App.json Güncelle**
```json
{
  "expo": {
    "plugins": [
      [
        "expo-ads-admob",
        {
          "androidAppId": "ca-app-pub-XXXXXXXXXXXX~YYYYYYYYYY",
          "iosAppId": "ca-app-pub-XXXXXXXXXXXX~ZZZZZZZZZZ",
          "userTrackingPermission": "This identifier will be used to deliver personalized ads to you."
        }
      ]
    ]
  }
}
```

## 📍 **Reklam Yerleşim Stratejisi**

### **Ana Sayfa (HomeScreen)**
- ✅ **Banner:** Sayfa altında
- ❌ **Interstitial:** Yok
- ❌ **Rewarded:** Yok

### **Test Seçimi (TestSelectionScreen)**
- ✅ **Banner:** Sayfa altında
- ❌ **Interstitial:** Yok
- ❌ **Rewarded:** Yok

### **Uyarı (DisclaimerScreen)**
- ❌ **Banner:** Yok (ciddi içerik)
- ❌ **Interstitial:** Yok
- ❌ **Rewarded:** Yok

### **Test (TestScreen)**
- ❌ **Banner:** Yok (test sırasında dikkat dağıtıcı)
- ❌ **Interstitial:** Yok
- ❌ **Rewarded:** Yok

### **Sonuç (ResultScreen)**
- ✅ **Banner:** Sayfa üstü ve altında
- ✅ **Interstitial:** Test sonrasında (her 3 testte bir)
- ✅ **Rewarded:** Detaylı analiz için

## 💰 **Gelir Optimizasyonu**

### **Reklam Sıklığı**
- **Banner:** Her sayfada maksimum 2
- **Interstitial:** Her 3-5 test sonrasında
- **Rewarded:** İsteğe bağlı, sınırsız

### **Kullanıcı Deneyimi**
- **Test sırasında reklam yok**
- **Önemli sayfalarda reklam yok**
- **Sadece sonuç sayfasında reklam**
- **Kullanıcı kontrolünde reklam**

### **Gelir Tahmini**
- **Banner:** $0.01-0.05 per view
- **Interstitial:** $0.10-0.50 per view
- **Rewarded:** $0.05-0.25 per view
- **Aylık gelir:** $50-500 (1000 kullanıcı)

## ⚠️ **Önemli Uyarılar**

### **Tıbbi Uygulama Kısıtlamaları**
- ❌ **İlaç reklamları** yasak
- ❌ **Sağlık ürünleri** reklamları kısıtlı
- ❌ **Yanıltıcı sağlık iddiaları** yasak
- ❌ **Çocuklara yönelik** reklamlar kısıtlı

### **Store Politikaları**
- ✅ **App Store:** Reklam izni var (uygun içerikle)
- ✅ **Play Store:** Reklam izni var (uygun içerikle)
- ⚠️ **Content Rating:** 12+ olabilir

### **Kullanıcı Deneyimi**
- ❌ **Test sırasında reklam gösterme**
- ❌ **Önemli uyarılarda reklam gösterme**
- ✅ **Sadece sonuç sayfasında reklam**
- ✅ **Kullanıcı kontrolünde reklam**

## 🚀 **Production'a Geçiş**

### **1. Test ID'lerini Değiştir**
```typescript
// Development
const adUnitId = __DEV__ ? TestIds.BANNER : 'REAL_AD_UNIT_ID';

// Production
const adUnitId = 'ca-app-pub-XXXXXXXXXXXX/YYYYYYYYYY';
```

### **2. Reklam Sıklığını Artır**
```typescript
// Test sırasında
const showAdEvery = 3; // Her 3 testte bir

// Production'da
const showAdEvery = 2; // Her 2 testte bir
```

### **3. A/B Testing**
- **Grup A:** Sadece banner reklamlar
- **Grup B:** Banner + interstitial reklamlar
- **Grup C:** Banner + interstitial + rewarded reklamlar

## 📊 **Analitik ve Raporlama**

### **AdMob Console**
- Reklam performansı
- Gelir raporları
- Kullanıcı etkileşimi
- CTR (Click Through Rate)

### **Firebase Analytics**
- Kullanıcı davranışı
- Reklam etkileşimi
- Gelir optimizasyonu
- A/B test sonuçları

## 🎯 **Önerilen Reklam Stratejisi**

### **Başlangıç (İlk 3 ay)**
- Sadece banner reklamlar
- Düşük reklam sıklığı
- Kullanıcı deneyimini öğren

### **Orta Dönem (3-6 ay)**
- Interstitial reklamlar ekle
- Reklam sıklığını artır
- A/B testing yap

### **Uzun Dönem (6+ ay)**
- Rewarded reklamlar ekle
- Gelir optimizasyonu
- Kullanıcı segmentasyonu

---

**Not:** Reklam geliri, kullanıcı deneyimi ve tıbbi uygulama standartları arasında denge kurulmalıdır.
