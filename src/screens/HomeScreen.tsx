import React, { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, useTheme } from 'react-native-paper';
import AdBanner from '../components/AdBanner';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const handleStartTest = useCallback(() => {
    navigation.navigate('TestSelection');
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: theme.colors.primary }}>
            DEHB Tespit
          </Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: theme.colors.onSurface }}>
            Dikkat Eksikliği Hiperaktivite Bozukluğu Tarama Aracı
          </Text>
        </View>

        <Card style={{ marginBottom: 24, backgroundColor: theme.colors.surfaceVariant }}>
          <Card.Content>
            <Text style={{ fontSize: 16, lineHeight: 24, color: theme.colors.onTertiaryContainer, textAlign: 'center' }}>
              Bu uygulama, DEHB belirtilerini değerlendirmek için bilimsel olarak kanıtlanmış tarama ölçekleri kullanır.
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 24, backgroundColor: theme.colors.tertiaryContainer }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onTertiaryContainer }}>
              Özellikler
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • ASRS v1.1 Yetişkin DEHB Ölçeği
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • NICHQ Vanderbilt Çocuk DEHB Ölçeği
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • DSM-5 uyumlu hesaplama
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • Profesyonel öneriler
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleStartTest}
          style={{ marginBottom: 16 }}
        >
          Teste Başla
        </Button>

        <AdBanner position="bottom" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
