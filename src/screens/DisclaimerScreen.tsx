import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Card, Button, Icon, MD3Colors} from 'react-native-paper';
import { theme, getTextStyle, getHeadingStyle } from '../utils/fonts';

type DisclaimerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Disclaimer'>;
type DisclaimerScreenRouteProp = RouteProp<RootStackParamList, 'Disclaimer'>;

interface Props {
  navigation: DisclaimerScreenNavigationProp;
  route: DisclaimerScreenRouteProp;
}

const DisclaimerScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userSelection } = route.params;
  const [accepted, setAccepted] = useState(false);

  const toggleAcceptance = () => {
    setAccepted(!accepted);
  };

  const handleAccept = () => {
    if (accepted) {
      navigation.navigate('Test', { userSelection, testType: userSelection.testType });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.secondary }}>
      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Icon
                source="alert"
                color={'orange'}
                size={40}
            />
          <Text style={[getHeadingStyle(24, 'bold', '#faad14'), { marginBottom: 12 }]}>
             Önemli Uyarı
          </Text>
          <Text style={[getTextStyle(16, 'normal', theme.colors.text.secondary), { textAlign: 'center' }]}>
            Lütfen aşağıdaki metni dikkatle okuyun
          </Text>
        </View>

        <Card style={{ marginBottom: 24, backgroundColor: '#fff7e6', borderColor: '#ffe58f' }}>
          <Card.Content>
            <Text style={getTextStyle(16, 'normal', theme.colors.text.primary)}>
              Bu uygulama tanı koymaz; sorumluluk reddi ve aydınlatılmış onam metnini onaylamadan devam edilemez.
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={[getHeadingStyle(18, 'bold', theme.colors.primary), { marginBottom: 16 }]}>
              Sorumluluk Reddi
            </Text>
            <Text style={getTextStyle(16, 'normal')}>
              Bu uygulama, DEHB (Dikkat Eksikliği Hiperaktivite Bozukluğu) için kanıta dayalı tarama ölçekleri sunar.
              Ancak aşağıdaki önemli noktaları kabul etmeniz gerekir:
            </Text>

            <View style={{ marginBottom: 12 }}>
              <Text style={getTextStyle(16, '600', '#ff4d4f')}>
                <Icon
                  source="alert"
                  color={'orange'}
                  size={20}
              /> Bu testler tanı aracı değildir
              </Text>
              <Text style={getTextStyle(14, 'normal', theme.colors.text.secondary)}>
                • Yalnızca ön tarama sağlar{'\n'}
                • Kesin tanı için uzman görüşü gerekir{'\n'}
                • Tıbbi değerlendirme yerine geçmez
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={getTextStyle(16, '600', '#ff4d4f')}>
                  <Icon
                      source="alert"
                      color={'orange'}
                      size={20}
                  /> Sorumluluk kabul edilmez
              </Text>
              <Text style={getTextStyle(14, 'normal', theme.colors.text.secondary)}>
                • Test sonuçları sadece bilgilendirme amaçlıdır{'\n'}
                • Herhangi bir tıbbi karar için kullanılamaz{'\n'}
                • Uygulama geliştiricisi sorumluluk kabul etmez
              </Text>
            </View>

            <View>
              <Text style={getTextStyle(16, '600', '#ff4d4f')}>
                  <Icon
                      source="alert"
                      color={'orange'}
                      size={20}
                  /> Uzman görüşü gerekir
              </Text>
              <Text style={getTextStyle(14, 'normal', theme.colors.text.secondary)}>
                • Pozitif sonuç durumunda mutlaka hekime başvurun{'\n'}
                • Test sonuçlarını hekiminizle paylaşın{'\n'}
                • Kendi kendinize tedavi uygulamayın
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <Text style={[getHeadingStyle(18, 'bold', theme.colors.primary), { marginBottom: 16 }]}>
              Onay ve Rıza
            </Text>
            <TouchableOpacity
              onPress={toggleAcceptance}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                  justifyContent: 'space-between',
                paddingVertical: 8,
                  paddingRight: 20
              }}
            >
              <View style={{
                borderWidth: 2,
                borderColor: accepted ? theme.colors.primary : '#d9d9d9',
                backgroundColor: accepted ? theme.colors.primary : 'white',
              }}>
                  {accepted ? <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', width: 20, height: 20, textAlign: 'center'}}>✓</Text> : <Text style={{width: 20, height: 20}}> </Text>}
              </View>
              <Text style={{...getTextStyle(16, 'normal'), marginLeft: 10}}>
                Yukarıdaki tüm uyarıları okudum ve kabul ediyorum.
                Bu uygulamayı kullanarak herhangi bir sorumluluk kabul etmediğimi
                ve test sonuçlarının sadece bilgilendirme amaçlı olduğunu anlıyorum.
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Button
          onPress={handleAccept}
          mode="contained"
          disabled={!accepted}
          style={{
            backgroundColor: accepted ? theme.colors.primary : '#d9d9d9'
          }}
        >
          Devam Et
        </Button>

        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <Text style={getTextStyle(12, 'normal', theme.colors.text.secondary)}>
            Bu uygulama Harvard Medical School ve NICHQ tarafından geliştirilen{'\n'}
            resmi ölçekleri kullanır. Metinler değiştirilmemiştir.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisclaimerScreen;
