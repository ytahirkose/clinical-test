const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Web platformunda react-native-google-mobile-ads paketini devre dışı bırak
config.resolver.platforms = ['web', 'ios', 'android'];

// Web platformunda native modülleri ignore et
config.resolver.resolverMainFields = ['browser', 'main'];

// Web platformunda react-native-google-mobile-ads paketini tamamen devre dışı bırak
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-google-mobile-ads': __dirname + '/src/utils/adsStub.js'
};

module.exports = config;
