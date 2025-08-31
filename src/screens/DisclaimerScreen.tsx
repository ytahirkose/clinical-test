import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Card, Button, Icon, MD3Colors, useTheme} from 'react-native-paper';
import { testTypes } from '../data/testTypes';

type DisclaimerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Disclaimer'>;
type DisclaimerScreenRouteProp = RouteProp<RootStackParamList, 'Disclaimer'>;

interface Props {
  navigation: DisclaimerScreenNavigationProp;
  route: DisclaimerScreenRouteProp;
}

const DisclaimerScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { userSelection } = route.params;
  const [accepted, setAccepted] = useState(false);

  const toggleAcceptance = useCallback(() => {
    setAccepted(!accepted);
  }, [accepted]);

  const handleAccept = useCallback(() => {
    if (accepted && userSelection.testType) {
      const selectedTest = testTypes.find(t => t.id === userSelection.testType);
      if (selectedTest) {
        navigation.navigate('Test', { userSelection, testType: selectedTest });
      } else {
        // Fallback: navigate to TestSelection if test type not found
        Alert.alert('Hata', 'Test tipi bulunamadı. Lütfen tekrar seçiniz.');
        navigation.navigate('TestSelection');
      }
    }
  }, [accepted, userSelection, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Icon
                source="alert"
                color={theme.colors.tertiary}
                size={40}
            />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: theme.colors.tertiary }}>
             Önemli Uyarı
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: theme.colors.onSurface }}>
            Lütfen aşağıdaki metni dikkatle okuyun
          </Text>
        </View>

        <Card style={{ marginBottom: 24, backgroundColor: theme.colors.tertiaryContainer, borderColor: theme.colors.tertiary }}>
          <Card.Content>
            <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
              Bu uygulama tanı koymaz; sorumluluk reddi ve aydınlatılmış onam metnini onaylamadan devam edilemez.
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.primary }}>
              Sorumluluk Reddi
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 22, color: theme.colors.onSurface }}>
              Bu uygulama, DEHB (Dikkat Eksikliği Hiperaktivite Bozukluğu) için kanıta dayalı tarama ölçekleri sunar.
              Ancak aşağıdaki önemli noktaları kabul etmeniz gerekir:
            </Text>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.error }}>
                <Icon
                  source="alert"
                  color={theme.colors.tertiary}
                  size={20}
              /> Bu testler tanı aracı değildir
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                • Yalnızca ön tarama sağlar{'\n'}
                • Kesin tanı için uzman görüşü gerekir{'\n'}
                • Tıbbi değerlendirme yerine geçmez
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.error }}>
                  <Icon
                      source="alert"
                      color={theme.colors.tertiary}
                      size={20}
                  /> Sorumluluk kabul edilmez
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                • Test sonuçları sadece bilgilendirme amaçlıdır{'\n'}
                • Herhangi bir tıbbi karar için kullanılamaz{'\n'}
                • Uygulama geliştiricisi sorumluluk kabul etmez
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.error }}>
                  <Icon
                      source="alert"
                      color={theme.colors.tertiary}
                      size={20}
                  /> Uzman görüşü gerekir
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                • Pozitif sonuç durumunda mutlaka hekime başvurun{'\n'}
                • Test sonuçlarını hekiminizle paylaşın{'\n'}
                • Kendi kendinize tedavi uygulamayın
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.primary }}>
              Onay ve Rıza
            </Text>
            <TouchableOpacity
              onPress={toggleAcceptance}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderWidth: 2,
                borderRadius: 8,
                borderColor: accepted ? theme.colors.primary : theme.colors.outline,
                paddingHorizontal: 16,
                backgroundColor: accepted ? theme.colors.primaryContainer : 'transparent'
              }}
            >
              <Icon
                source={accepted ? 'check-circle' : 'circle-outline'}
                size={24}
                color={accepted ? theme.colors.primary : theme.colors.outline}
              />
              <Text style={{ fontSize: 16, marginLeft: 12, flex: 1, color: theme.colors.onSurface }}>
                Yukarıdaki tüm koşulları okudum ve kabul ediyorum
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleAccept}
          disabled={!accepted}
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

export default DisclaimerScreen;
