# 🌍 Çok Dilli Destek Kurulumu

Bu belge, DEHB Tespit uygulamasında çok dilli desteğin nasıl kurulduğunu ve yönetildiğini açıklar.

## 📋 Desteklenen Diller

Uygulama şu anda **13 dil** desteği sunmaktadır:

### 🌟 **Yüksek Öncelikli Diller:**
1. **Türkçe (tr)** - Ana hedef kitle
2. **İngilizce (en)** - Global standart
3. **Arapça (ar)** - Orta Doğu pazarı
4. **Fransızca (fr)** - Fransa, Kanada, Afrika ülkeleri
5. **İspanyolca (es)** - İspanya, Latin Amerika, ABD
6. **Portekizce (pt)** - Portekiz, Brezilya
7. **Rusça (ru)** - Rusya, eski Sovyet ülkeleri
8. **Çince (zh)** - Çin pazarı
9. **Almanca (de)** - Almanya, Avusturya, İsviçre

### 🟡 **Orta Öncelikli Diller:**
10. **İtalyanca (it)** - İtalya
11. **Hollandaca (nl)** - Hollanda, Belçika
12. **Lehçe (pl)** - Polonya
13. **Macarca (hu)** - Macaristan

## 🚀 Kurulum

### Gerekli Paketler

```bash
npm install i18next react-i18next @react-native-async-storage/async-storage
```

### Babel Konfigürasyonu

`babel.config.js` dosyasına ekleyin:

```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-native-google-mobile-ads': './src/utils/adsStub.js',
        },
      },
    ],
  ],
};
```

## 📁 Dosya Yapısı

```
src/
├── locales/
│   ├── index.ts          # Dil dosyalarının ana girişi
│   ├── tr.ts             # Türkçe çeviriler
│   ├── en.ts             # İngilizce çeviriler
│   ├── ar.ts             # Arapça çeviriler
│   ├── fr.ts             # Fransızca çeviriler
│   ├── it.ts             # İtalyanca çeviriler
│   ├── es.ts             # İspanyolca çeviriler
│   ├── pt.ts             # Portekizce çeviriler
│   ├── ru.ts             # Rusça çeviriler
│   ├── zh.ts             # Çince çeviriler
│   ├── de.ts             # Almanca çeviriler
│   ├── nl.ts             # Hollandaca çeviriler
│   ├── pl.ts             # Lehçe çeviriler
│   └── hu.ts             # Macarca çeviriler
├── config/
│   └── i18n.ts           # i18next konfigürasyonu
└── components/
    └── LanguageSelector.tsx  # Dil seçici bileşeni
```

## ⚙️ Konfigürasyon

### i18n.ts

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import locales from '../locales';

const resources = {
  tr: { translation: locales.tr },
  en: { translation: locales.en },
  ar: { translation: locales.ar },
  fr: { translation: locales.fr },
  it: { translation: locales.it },
  es: { translation: locales.es },
  pt: { translation: locales.pt },
  ru: { translation: locales.ru },
  zh: { translation: locales.zh },
  de: { translation: locales.de },
  nl: { translation: locales.nl },
  pl: { translation: locales.pl },
  hu: { translation: locales.hu },
};

const LANGUAGE_KEY = '@language';

const detectLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && resources[savedLanguage as keyof typeof resources]) {
      return savedLanguage;
    }
    return 'tr'; // Varsayılan dil
  } catch (error) {
    console.error('Dil algılama hatası:', error);
    return 'tr';
  }
};

export const changeLanguage = async (languageCode: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    await i18n.changeLanguage(languageCode);
  } catch (error) {
    console.error('Dil değiştirme hatası:', error);
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

// Uygulama başladığında kaydedilmiş dili yükle
detectLanguage().then((language) => {
  i18n.changeLanguage(language);
});

export default i18n;
```

## 🎯 Kullanım

### Bileşenlerde Çeviri Kullanımı

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <Text>{t('common.continue')}</Text>
  );
};
```

### Dil Değiştirme

```typescript
import { changeLanguage } from '../config/i18n';

const handleLanguageChange = async (languageCode: string) => {
  await changeLanguage(languageCode);
};
```

## 🔑 Çeviri Anahtarları

### Temel Anahtarlar

```typescript
common: {
  continue: 'Devam Et',
  back: 'Geri',
  next: 'İleri',
  finish: 'Bitir',
  cancel: 'İptal',
  save: 'Kaydet',
  loading: 'Yükleniyor...',
  error: 'Hata',
  success: 'Başarılı',
  yes: 'Evet',
  no: 'Hayır',
  ok: 'Tamam',
  close: 'Kapat',
  retry: 'Tekrar Dene',
  submit: 'Gönder',
  edit: 'Düzenle',
  delete: 'Sil',
  confirm: 'Onayla',
  warning: 'Uyarı',
  info: 'Bilgi',
}
```

### Dil Seçici

```typescript
languageSelector: {
  title: 'Dil Seçin',
  subtitle: 'Hangi dilde kullanmak istiyorsunuz?',
  continue: 'Devam Et',
}
```

### Ana Sayfa

```typescript
home: {
  title: 'DEHB Tespit',
  subtitle: 'Dikkat Eksikliği Hiperaktivite Bozukluğu Tarama Aracı',
  description: 'Bu uygulama, DEHB belirtilerini değerlendirmek için bilimsel olarak kanıtlanmış tarama ölçekleri kullanır.',
  features: 'Özellikler',
  feature1: 'ASRS v1.1 Yetişkin DEHB Ölçeği',
  feature2: 'NICHQ Vanderbilt Çocuk DEHB Ölçeği',
  feature3: 'DSM-5 uyumlu hesaplama',
  feature4: 'Profesyonel öneriler',
  startTest: 'Testi Başlat',
}
```

### Test Seçimi

```typescript
testSelection: {
  title: 'Test Seçimi',
  subtitle: 'Hangi testi yapmak istiyorsunuz?',
  adultTest: 'Yetişkin DEHB Testi',
  adultTestDesc: '18 yaş ve üzeri için ASRS v1.1 ölçeği',
  childTest: 'Çocuk DEHB Testi',
  childTestDesc: '6-17 yaş için NICHQ Vanderbilt ölçeği',
  disclaimer: 'Bu test sadece tarama amaçlıdır ve profesyonel teşhisin yerini tutmaz.',
}
```

### Sorumluluk Reddi

```typescript
disclaimer: {
  title: 'Önemli Uyarı',
  subtitle: 'Lütfen aşağıdaki metni dikkatlice okuyun',
  content: 'Bu uygulama teşhis koymaz; sorumluluk reddi ve bilgilendirilmiş onay metnini kabul etmeden devam edemezsiniz.',
  responsibilityTitle: 'Sorumluluk Reddi',
  responsibilityContent: 'Bu uygulama, DEHB (Dikkat Eksikliği Hiperaktivite Bozukluğu) için kanıta dayalı tarama ölçekleri sunar. Ancak aşağıdaki önemli noktaları kabul etmelisiniz:',
  notDiagnosticTitle: 'Bu testler teşhis araçları değildir',
  notDiagnosticContent: '• Sadece ön tarama sağlar\n• Kesin teşhis için uzman görüşü gerekir\n• Tıbbi değerlendirmenin yerini tutmaz',
  noLiabilityTitle: 'Sorumluluk kabul edilmez',
  noLiabilityContent: '• Test sonuçları sadece bilgilendirme amaçlıdır\n• Tıbbi kararlar için kullanılamaz\n• Uygulama geliştiricisi sorumluluk kabul etmez',
  consentTitle: 'Bilgilendirilmiş Onay',
  consentContent: 'Bu uygulamayı kullanarak yukarıdaki bilgileri okuduğunuzu ve anladığınızı kabul ediyorsunuz.',
  agree: 'Anlıyorum ve Kabul Ediyorum',
  error: 'Hata',
  testTypeNotFound: 'Test türü bulunamadı. Lütfen tekrar seçin.',
  expertOpinionTitle: 'Uzman görüşü gerekli',
  expertOpinionContent: '• Pozitif sonuç varsa doktora danışın\n• Test sonuçlarını doktorunuzla paylaşın\n• Kendi kendinizi tedavi etmeyin',
  consentAndAgreement: 'Onay ve Anlaşma',
  readAndAgree: 'Yukarıdaki tüm koşulları okudum ve kabul ediyorum',
  continue: 'Devam Et',
  goBack: 'Geri Dön',
}
```

### Test Ekranı

```typescript
test: {
  question: 'Soru',
  of: '/',
  next: 'İleri',
  previous: 'Önceki',
  finish: 'Testi Bitir',
  progress: 'İlerleme',
  error: 'Hata',
  testTypeNotFound: 'Test türü bulunamadı.',
  currentQuestion: 'Soru',
  totalQuestions: 'Toplam Soru',
  questionProgress: 'İlerleme',
  answerRequired: 'Lütfen bir cevap seçin',
  completeTest: 'Testi Tamamla',
  skipQuestion: 'Bu soruyu atlayabilir miyim?',
  skipWarning: 'Bu soruyu atlamak istediğinizden emin misiniz? Atlanan sorular 0 puan olarak değerlendirilir.',
  skip: 'Atla',
  cancel: 'İptal',
  answerOptions: 'Cevap Seçenekleri',
}
```

### Sonuç Ekranı

```typescript
result: {
  title: 'Test Sonucu',
  subtitle: 'Test sonucunuz',
  score: 'Puan',
  interpretation: 'Yorumlama',
  recommendations: 'Öneriler',
  share: 'Paylaş',
  retake: 'Testi Tekrarla',
  home: 'Ana Sayfa',
  lowRisk: 'Düşük Risk',
  moderateRisk: 'Orta Risk',
  highRisk: 'Yüksek Risk',
  attentionScore: 'Dikkat Puanı',
  hyperactivityScore: 'Hiperaktivite Puanı',
  totalScore: 'Toplam Puan',
  generalResult: 'Genel Sonuç',
  points: 'puan',
  riskLevel: 'Risk Seviyesi',
  categoryScores: 'Kategori Puanları',
  attention: 'Dikkat',
  hyperactivity: 'Hiperaktivite',
  impulsivity: 'Dürtüsellik',
  dsm5Criteria: 'DSM-5 Kriterleri',
  criteriaMet: '✅ Karşılandı',
  criteriaNotMet: '❌ Karşılanmadı',
  attentionCriteria: 'Dikkat Kriterleri',
  hyperactivityCriteria: 'Hiperaktivite/Dürtüsellik Kriterleri',
  recommendation: 'Öneri',
  unclear: 'Belirsiz',
  shareResult: 'Sonucu Paylaş',
  saveResult: 'Sonucu Kaydet',
  printResult: 'Sonucu Yazdır',
  screenerRecommendation: 'En az 4 koyu kutu işaretlendi - daha fazla değerlendirme önerilir.',
  recommendations: {
    asrs: {
      negative: 'ASRS v1.1 sonucu negatif. DEHB belirtileri düşük seviyede görünüyor. Ancak bu sadece ön tarama ve kesin teşhis sağlamaz.',
      positive: 'ASRS v1.1 sonucu pozitif. DEHB belirtileri yüksek seviyede görünüyor. Psikiyatrist veya nörolog ile görüşmelisiniz.'
    },
    vanderbilt: {
      lowRisk: 'Vanderbilt sonucu düşük risk gösteriyor. DEHB belirtileri düşük seviyede görünüyor. Ancak bu sadece ön tarama ve kesin teşhis sağlamaz.',
      highRisk: 'Vanderbilt sonucu yüksek risk gösteriyor. DEHB belirtileri yüksek seviyede görünüyor. Çocuk gelişim uzmanı veya psikiyatrist ile görüşmelisiniz.'
    }
  }
}
```

### Sorular

```typescript
questions: {
  // ASRS v1.1 Yetişkin DEHB Ölçeği
  asrs_1: 'Görevleri ve etkinlikleri organize etmekte zorluk yaşarım',
  asrs_2: 'Detaylara dikkat etmekte zorluk yaşarım',
  asrs_3: 'Doğrudan konuşulduğunda dinlemekte zorluk yaşarım',
  asrs_4: 'Talimatları takip etmekte ve görevleri tamamlamakta zorluk yaşarım',
  asrs_5: 'Sürekli zihinsel çaba gerektiren projeleri ve etkinlikleri organize etmekte zorluk yaşarım',
  asrs_6: 'Görevler ve etkinlikler için gerekli olan şeyleri kaybederim',
  asrs_7: 'Kolayca dikkatim dağılır',
  asrs_8: 'Günlük etkinlikleri unuturum',
  asrs_9: 'Ellerimle veya ayaklarımla kıpırdanırım veya sandalyede kıvranırım',
  asrs_10: 'Oturur pozisyonda kalmakta zorluk yaşarım',
  asrs_11: 'Aşırı konuşurum',
  asrs_12: 'Sessizce oynamakta veya boş zaman etkinliklerine katılmakta zorluk yaşarım',
  asrs_13: 'Sürekli hareket halindeyim',
  asrs_14: 'Rahatlamakta zorluk yaşarım',
  asrs_15: 'Bir şeyler yapmaya zorlanmış hissederim',
  asrs_16: 'Sıramı beklemekte zorluk yaşarım',
  asrs_17: 'Başkalarını keserim',
  asrs_18: 'Düşünmeden hareket ederim',
  
  // NICHQ Vanderbilt Çocuk DEHB Ölçeği
  vanderbilt_1: 'Çocuğunuz dikkat etmekte zorluk yaşar mı?',
  vanderbilt_2: 'Çocuğunuz detaylara dikkat etmekte zorluk yaşar mı?',
  vanderbilt_3: 'Çocuğunuz görevleri tamamlamakta zorluk yaşar mı?',
  vanderbilt_4: 'Çocuğunuz organize olmakta zorluk yaşar mı?',
  vanderbilt_5: 'Çocuğunuz sürekli zihinsel çaba gerektiren görevlerden kaçınır mı?',
  vanderbilt_6: 'Çocuğunuz eşyalarını kaybeder mi?',
  vanderbilt_7: 'Çocuğunuz kolayca dikkati dağılır mı?',
  vanderbilt_8: 'Çocuğunuz günlük etkinlikleri unutur mu?',
  vanderbilt_9: 'Çocuğunuz elleriyle veya ayaklarıyla kıpırdanır mı veya sandalyede kıvranır mı?',
  vanderbilt_10: 'Çocuğunuz oturur pozisyonda kalmakta zorluk yaşar mı?',
  vanderbilt_11: 'Çocuğunuz aşırı konuşur mu?',
  vanderbilt_12: 'Çocuğunuz sessizce oynamakta zorluk yaşar mı?',
  vanderbilt_13: 'Çocuğunuz sürekli hareket halinde mi?',
  vanderbilt_14: 'Çocuğunuz rahatlamakta zorluk yaşar mı?',
  vanderbilt_15: 'Çocuğunuz bir şeyler yapmaya zorlanmış hisseder mi?',
  vanderbilt_16: 'Çocuğunuz sırasını beklemekte zorluk yaşar mı?',
  vanderbilt_17: 'Çocuğunuz başkalarını keser mi?',
  vanderbilt_18: 'Çocuğunuz düşünmeden hareket eder mi?',
}
```

### Cevap Seçenekleri

```typescript
answers: {
  never: 'Hiç',
  rarely: 'Nadiren',
  sometimes: 'Bazen',
  often: 'Sık sık',
  veryOften: 'Çok sık',
  notAtAll: 'Hiç değil',
  justALittle: 'Biraz',
  quiteABit: 'Oldukça',
  veryMuch: 'Çok fazla',
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}
```

## 🌐 Yeni Dil Ekleme

### 1. Yeni Dil Dosyası Oluşturma

`src/locales/` klasöründe yeni dil dosyası oluşturun (örn: `ja.ts`):

```typescript
export default {
  common: {
    continue: '続行',
    back: '戻る',
    // ... diğer çeviriler
  },
  // ... diğer bölümler
};
```

### 2. Ana Dosyaya Ekleme

`src/locales/index.ts` dosyasına yeni dili ekleyin:

```typescript
import ja from './ja';

export default {
  // ... mevcut diller
  ja,
};
```

### 3. i18n Konfigürasyonuna Ekleme

`src/config/i18n.ts` dosyasına yeni dili ekleyin:

```typescript
const resources = {
  // ... mevcut diller
  ja: { translation: locales.ja },
};
```

### 4. Dil Seçiciye Ekleme

`src/components/LanguageSelector.tsx` dosyasına yeni dili ekleyin:

```typescript
const languages: LanguageOption[] = [
  // ... mevcut diller
  { code: 'ja', name: t('languages.japanese'), nativeName: '日本語', flag: '🇯🇵' },
];
```

## 📊 Pazar Kapsamı

**13 dil ile %90+ pazar kapsamı** sağlanmaktadır:

- **Türkiye** - 84M nüfus
- **ABD + İngilizce konuşan ülkeler** - 400M+ nüfus
- **Orta Doğu (Arapça)** - 400M+ nüfus
- **Fransa + Kanada + Afrika** - 300M+ nüfus
- **İspanya + Latin Amerika** - 500M+ nüfus
- **Portekiz + Brezilya** - 250M+ nüfus
- **Rusya + eski Sovyet ülkeleri** - 300M+ nüfus
- **Çin** - 1.4B+ nüfus
- **Almanya + Avusturya + İsviçre** - 100M+ nüfus
- **İtalya** - 60M nüfus
- **Hollanda + Belçika** - 30M nüfus
- **Polonya** - 38M nüfus
- **Macaristan** - 10M nüfus

**Toplam: 3.5B+ potansiyel kullanıcı**

## 🔧 Sorun Giderme

### Yaygın Hatalar

1. **Çeviri bulunamadı hatası**: Çeviri anahtarının dil dosyasında tanımlandığından emin olun
2. **Dil değişmiyor**: `changeLanguage` fonksiyonunun doğru çağrıldığından emin olun
3. **AsyncStorage hatası**: Web platformunda localStorage kullanımını kontrol edin

### Debug İpuçları

```typescript
// Mevcut dili kontrol etme
console.log('Current language:', i18n.language);

// Mevcut dilleri kontrol etme
console.log('Available languages:', i18n.languages);

// Çeviri anahtarlarını kontrol etme
console.log('Translation keys:', Object.keys(t('', { returnObjects: true })));
```

## 📚 Faydalı Linkler

- [i18next Dokümantasyonu](https://www.i18next.com/)
- [react-i18next Dokümantasyonu](https://react.i18next.com/)
- [React Native AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

## 🤝 Katkıda Bulunma

Yeni dil eklemek veya mevcut çevirileri iyileştirmek için:

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun
3. Değişikliklerinizi yapın
4. Pull request gönderin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
