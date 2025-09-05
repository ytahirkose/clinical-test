import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TextInput, useTheme } from 'react-native-paper';
import NativeButton from '../components/NativeButton';
import { useTranslation } from 'react-i18next';
import { createTestTypes } from '../data/testTypes';
import { UserSelection } from '../types';

type TestSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestSelection'>;
type TestSelectionScreenRouteProp = RouteProp<RootStackParamList, 'TestSelection'>;

interface Props {
  navigation: TestSelectionScreenNavigationProp;
  route: TestSelectionScreenRouteProp;
}

const TestSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [age, setAge] = useState('');
  const [selectedTestType, setSelectedTestType] = useState<string>('');
  const testTypes = useMemo(() => createTestTypes(t), [t]);

  useEffect(() => {
    if (age) {
      const ageNum = parseInt(age);
      if (ageNum >= 18) {
        setSelectedTestType('asrs');
      } else {
        setSelectedTestType('vanderbilt-parent');
      }
    }
  }, [age]);

  const handleContinue = useCallback(() => {
    if (!age || !selectedTestType) {
      Alert.alert(t('common.error'), t('testSelection.ageRequired'));
      return;
    }

    const ageNum = parseInt(age);
    if (ageNum < 6) {
      Alert.alert(t('common.error'), t('testSelection.ageLimit'));
      return;
    }

    const userSelection: UserSelection = {
      age: ageNum,
      testType: selectedTestType
    };

    navigation.navigate('Disclaimer', { userSelection });
  }, [age, selectedTestType, navigation]);

  const getTestTypeDescription = (testType: string) => {
    switch (testType) {
      case 'asrs':
        return t('testSelection.adultTestDesc');
      case 'vanderbilt-parent':
        return t('testSelection.childTestDesc');
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: theme.colors.onSurface }}>
            {t('testSelection.title')}
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: theme.colors.onSurface }}>
            {t('testSelection.subtitle')}
          </Text>
        </View>

        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
              {t('testSelection.ageInfo')}
            </Text>
            <TextInput
              label={t('testSelection.ageLabel')}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              mode="outlined"
              style={{ marginBottom: 16 }}
            />
            <Text style={{ fontSize: 12, marginTop: 10, color: theme.colors.onSurfaceVariant }}>
              {t('testSelection.ageDescription')}
            </Text>
          </Card.Content>
        </Card>

        {selectedTestType ? <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
              {t('testSelection.testType')}
            </Text>
            <Text style={{ fontSize: 14, color: theme.colors.onSurface }}>
              {getTestTypeDescription(selectedTestType)}
            </Text>
          </Card.Content>
        </Card> : null}

        <NativeButton
          variant="contained"
          onPress={handleContinue}
          disabled={!age}
          style={{ marginBottom: 16 }}
        >
          {t('common.continue')}
        </NativeButton>

        <NativeButton
          variant="outlined"
          onPress={() => navigation.goBack()}
        >
          {t('common.back')}
        </NativeButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestSelectionScreen;
