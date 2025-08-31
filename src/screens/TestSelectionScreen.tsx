import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, TextInput, useTheme } from 'react-native-paper';
import { testTypes } from '../data/testTypes';
import { UserSelection } from '../types';

type TestSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestSelection'>;
type TestSelectionScreenRouteProp = RouteProp<RootStackParamList, 'TestSelection'>;

interface Props {
  navigation: TestSelectionScreenNavigationProp;
  route: TestSelectionScreenRouteProp;
}

const TestSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const [age, setAge] = useState('');
  const [selectedTestType, setSelectedTestType] = useState<string>('');

  useEffect(() => {
    if (age) {
      const ageNum = parseInt(age);
      if (ageNum >= 18) {
        setSelectedTestType('asrs');
      } else if (ageNum >= 6) {
        setSelectedTestType('vanderbilt-parent');
      } else {
        setSelectedTestType('');
      }
    }
  }, [age]);

  const handleContinue = useCallback(() => {
    if (!age || !selectedTestType) {
      Alert.alert('Hata', 'Lütfen yaş giriniz ve test tipini seçiniz.');
      return;
    }

    const ageNum = parseInt(age);
    if (ageNum < 6) {
      Alert.alert('Hata', 'Bu uygulama 6 yaş ve üzeri için tasarlanmıştır.');
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
        return 'WHO ASRS v1.1 - Yetişkinler için (18+ yaş)';
      case 'vanderbilt-parent':
        return 'NICHQ Vanderbilt - Çocuklar için (6-17 yaş)';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
            Test Seçimi
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Lütfen yaşınızı girin ve uygun test tipini seçin
          </Text>
        </View>

        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
              Yaş Bilgisi
            </Text>
            <TextInput
              label="Yaşınız"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              mode="outlined"
              style={{ marginBottom: 16 }}
            />
            <Text style={{ fontSize: 12, marginTop: 10 }}>
              Yaş bilgisi, size uygun test tipini otomatik olarak seçmek için kullanılır.
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
              Test Tipi
            </Text>
            <Text style={{ fontSize: 14 }}>
              {selectedTestType ? getTestTypeDescription(selectedTestType) : 'Yaş giriniz...'}
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!age || !selectedTestType}
          style={{ marginBottom: 16 }}
        >
          Devam Et
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
        >
          Geri Dön
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestSelectionScreen;
