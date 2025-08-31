import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, TextInput, Chip } from 'react-native-paper';
import { theme, getTextStyle, getHeadingStyle } from '../utils/fonts';
import { UserSelection } from '../types';

type TestSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestSelection'>;

interface Props {
  navigation: TestSelectionScreenNavigationProp;
}

const TestSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [userSelection, setUserSelection] = useState<UserSelection>({
    age: '',
    testType: '',
    relationship: ''
  });

  useEffect(() => {
    if (userSelection.age) {
      const age = parseInt(userSelection.age);

      if (age >= 18) {
        if (userSelection.testType !== 'asrs') {
          setUserSelection(prev => ({ ...prev, testType: 'asrs', relationship: '' }));
        }
      } else {
        if (userSelection.testType !== 'vanderbilt-parent') {
          setUserSelection(prev => ({ ...prev, testType: 'vanderbilt-parent', relationship: 'parent' }));
        }
      }
    }
  }, [userSelection.age]);

  const handleAgeChange = (age: string) => {
    setUserSelection(prev => ({ ...prev, age }));
  };

  const handleStartTest = () => {
    if (!userSelection.age || !userSelection.testType) {
      Alert.alert('Uyarı', 'Lütfen yaş ve test tipini seçiniz.');
      return;
    }

    const age = parseInt(userSelection.age);

    if (isNaN(age) || age < 4 || age > 100) {
      Alert.alert('Uyarı', 'Lütfen geçerli bir yaş giriniz (4-100).');
      return;
    }

    if (age < 18 && !userSelection.testType?.includes('vanderbilt')) {
      Alert.alert('Uyarı', '18 yaş altı için Vanderbilt ölçekleri kullanılmalıdır.');
      return;
    }
    if (age >= 18 && userSelection.testType?.includes('vanderbilt')) {
      Alert.alert('Uyarı', '18 yaş üstü için ASRS ölçekleri kullanılmalıdır.');
      return;
    }

    navigation.navigate('Disclaimer', { userSelection });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.secondary }}>
      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={[getHeadingStyle(24, 'bold', theme.colors.primary), { marginBottom: 12 }]}>
            Test Seçimi
          </Text>
          <Text style={[getTextStyle(16, 'normal', theme.colors.text.secondary), { textAlign: 'center' }]}>
            Size uygun testi seçin
          </Text>
        </View>

        <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <TextInput
                mode="outlined"
              value={userSelection.age}
              onChangeText={handleAgeChange}
              placeholder="Yaşınızı giriniz"
              keyboardType="numeric"
            />
            <Text style={{...getTextStyle(12, 'normal', theme.colors.text.secondary), marginTop: 10}}>
                Yaş bilginize göre size uygun test otomatik olarak seçilecektir.
            </Text>
          </Card.Content>
        </Card>

        <Button
            mode="contained"
          onPress={handleStartTest}
          disabled={!userSelection.age}
        >
          Teste Başla
        </Button>

        <Card style={{ marginTop: 24, marginBottom: 24 }}>
          <Card.Content>
            <Text style={[getHeadingStyle(18, 'bold', theme.colors.primary), { marginBottom: 16 }]}>
              Önemli Notlar
            </Text>
            <Text style={getTextStyle(14, 'normal', theme.colors.text.secondary)}>
              • Bu testler tanı aracı değildir; yalnızca ön tarama sağlar{'\n'}
              • Sonuçlarınızı bir hekimle paylaşmanız önerilir{'\n'}
              • Test sonuçları yerel olarak saklanır{'\n'}
              • Resmi ölçek metinleri değiştirilmemiştir
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestSelectionScreen;
