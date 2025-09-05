import React, { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, useTheme } from 'react-native-paper';
import NativeButton from '../components/NativeButton';
import { useTranslation } from 'react-i18next';
import AdBanner from '../components/AdBanner';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleStartTest = useCallback(() => {
    navigation.navigate('TestSelection');
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: theme.colors.primary }}>
            {t('home.title')}
          </Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: theme.colors.onSurface }}>
            {t('home.subtitle')}
          </Text>
        </View>

        <Card style={{ marginBottom: 24, backgroundColor: theme.colors.surfaceVariant }}>
          <Card.Content>
            <Text style={{ fontSize: 16, lineHeight: 24, color: theme.colors.onTertiaryContainer, textAlign: 'center' }}>
              {t('home.description')}
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 24, backgroundColor: theme.colors.tertiaryContainer }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onTertiaryContainer }}>
              {t('home.features')}
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • {t('home.feature1')}
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • {t('home.feature2')}
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • {t('home.feature3')}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 16, color: theme.colors.onTertiaryContainer }}>
                • {t('home.feature4')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <NativeButton
          variant="contained"
          onPress={handleStartTest}
          style={{ marginBottom: 16 }}
        >
          {t('home.startTest')}
        </NativeButton>

        <AdBanner position="bottom" screen="home" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
