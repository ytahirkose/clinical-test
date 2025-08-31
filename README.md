# DEHB Detection - ADHD Screening App

A professional ADHD screening application based on validated clinical scales used by healthcare professionals worldwide.

## 🚀 Features

- **ASRS v1.1 Adult ADHD Self-Report Scale** (Harvard Medical School)
- **NICHQ Vanderbilt Assessment Scale** for Children and Adolescents
- **DSM-5 compliant scoring** algorithms
- **Age-appropriate test selection** (6+ years)
- **Turkish language interface**
- **Offline functionality**
- **Professional recommendations**

## 🔬 Scientific Validation

- **Harvard Medical School** validated scales
- **WHO (World Health Organization)** standards
- **NICHQ (National Initiative for Children's Healthcare Quality)**
- **Evidence-based risk assessment**
- **DSM-5 compliant criteria**

## 📱 Platforms

- **iOS:** iPhone 6s+ (iOS 12+)
- **Android:** Android 5.0+ (API 21+)
- **Web:** Modern browsers

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Expo CLI 5.9.1+
- EAS CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

```bash
# Clone repository
git clone [your-repo-url]
cd DEHBTespit

# Install dependencies
npm install

# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login
```

### Development Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Clear cache
npm run clear
```

## 🏗️ Building

### Preview Builds

```bash
# Android APK
eas build --platform android --profile preview

# iOS Simulator
eas build --platform ios --profile preview

# Both platforms
npm run build:preview
```

### Production Builds

```bash
# Android App Bundle
npm run build:android

# iOS Archive
npm run build:ios

# Both platforms
npm run build:all
```

## 📤 Deployment

### Store Submission

```bash
# Submit to Google Play Store
npm run submit:android

# Submit to App Store
npm run submit:ios

# Submit to both stores
npm run submit:all
```

### Complete Deployment

```bash
# Build and submit to Android
npm run deploy:android

# Build and submit to iOS
npm run deploy:ios

# Build and submit to both
npm run deploy:all
```

## 🏪 Store Requirements

### App Store Connect
- Apple Developer Account ($99/year)
- App Store Connect access
- Privacy policy document
- App screenshots (multiple sizes)
- App icon (1024x1024)
- Content rating questionnaire

### Google Play Console
- Google Play Developer Account ($25 one-time)
- Privacy policy URL
- App screenshots (multiple sizes)
- Feature graphic (1024x500)
- Content rating questionnaire
- App signing configuration

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] TypeScript compilation successful
- [ ] No console.log statements
- [ ] All screens tested
- [ ] Error handling implemented
- [ ] Performance optimized

### Store Assets
- [ ] App icon (1024x1024)
- [ ] Screenshots for all required sizes
- [ ] Privacy policy document
- [ ] Terms of service document
- [ ] App descriptions and keywords

### Configuration
- [ ] Bundle ID/package name set
- [ ] Version numbers configured
- [ ] Permissions minimized
- [ ] Privacy descriptions added
- [ ] EAS build profiles configured

## ⚠️ Important Disclaimers

### Medical Disclaimer
This application is designed for **educational and screening purposes only**. It is **NOT a medical diagnostic tool** and should **NOT replace professional medical evaluation**. Results should always be discussed with qualified healthcare professionals.

### Privacy
- All data stored locally on device
- No external data transmission
- No personal information collected
- GDPR and CCPA compliant

## 📚 Documentation

- [Privacy Policy](PRIVACY_POLICY.md)
- [Terms of Service](TERMS_OF_SERVICE.md)
- [Store Assets Guide](STORE_ASSETS.md)
- [EAS Build Configuration](eas.json)
- [App Configuration](app.json)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For technical support or questions:
- Email: [your-email@domain.com]
- Response time: Within 48 hours

---

**Note:** This app is for educational purposes only. Always consult qualified healthcare professionals for medical concerns.
