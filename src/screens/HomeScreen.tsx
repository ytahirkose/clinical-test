import React, { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Chip } from 'react-native-paper';
import { theme, getTextStyle, getHeadingStyle } from '../utils/fonts';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartTest = useCallback(() => {
    navigation.navigate('TestSelection');
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.secondary }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={[getHeadingStyle(28, 'bold', theme.colors.primary), { marginBottom: 12 }]}>
            🧠 DEHB Tespit
          </Text>
          <Text style={[getTextStyle(18, 'normal', theme.colors.text.primary), { textAlign: 'center', lineHeight: 26 }]}>
            Dikkat Eksikliği Hiperaktivite Bozukluğu için kanıta dayalı tarama ölçekleri
          </Text>
        </View>

        <Card style={{ marginBottom: 20, backgroundColor: theme.colors.background.secondary }}>
          <Card.Content>
            <Text style={getTextStyle(12, 'normal', theme.colors.primary)}>
               Bu uygulama, DEHB (Dikkat Eksikliği Hiperaktivite Bozukluğu) için tarama ölçekleri sunar.
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={[getHeadingStyle(20, 'bold', theme.colors.primary), { marginBottom: 12 }]}>
              Özellikler
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={getTextStyle(16, 'normal', theme.colors.text.primary)}>
                • WHO ASRS v1.1 (Yetişkinler için){'\n'}
                • NICHQ Vanderbilt (Çocuklar için){'\n'}
                • DSM-5 uyumlu değerlendirme{'\n'}
                • Otomatik risk hesaplama{'\n'}
                • Kişiselleştirilmiş öneriler
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Button
            mode="contained"
          onPress={handleStartTest}
          style={{
            marginTop: 20
          }}
        >
          Teste Başla
        </Button>

        <Card style={{ marginTop: 20, backgroundColor: '#fff7e6' }}>
          <Card.Content>
            <Text style={[getTextStyle(14, 'normal', '#faad14'), { textAlign: 'center', fontWeight: '500' }]}>
              ⚠️ Bu uygulama tanı koymaz; sadece tarama amaçlıdır. Kesin tanı için uzman görüşü gerekir.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
