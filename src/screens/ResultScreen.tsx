import React from 'react';
import { View, Text, ScrollView, Alert, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Chip, Divider } from 'react-native-paper';
import { calculateScore, getCategoryScores } from '../utils/scoreCalculator';
import { Answer } from '../types';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface Props {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
}

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { score, answers, testType, userSelection } = route.params;

  const answerObjects: Answer[] = answers.map((value, index) => ({
    questionId: index + 1,
    value,
  }));

  const result = calculateScore(answerObjects, testType);
  const categoryScores = getCategoryScores(answerObjects, testType);

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '#52c41a';
      case 'medium': return '#faad14';
      case 'high': return '#ff4d4f';
      default: return '#1890ff';
    }
  };

  const getRiskLevelText = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'Düşük Risk';
      case 'medium': return 'Orta Risk';
      case 'high': return 'Yüksek Risk';
      default: return 'Bilinmiyor';
    }
  };

  const getProgressBar = (percentage: number, color: string) => {
    return (
      <View style={{ height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
        <View style={{ width: `${percentage}%`, height: '100%', backgroundColor: color }} />
      </View>
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      'Acil Durum',
      "Eğer acil bir durum yaşıyorsanız, lütfen 112'yi arayın veya en yakın hastaneye gidin.",
      [
        { text: 'Tamam', style: 'default' },
        { text: '112 Ara', onPress: () => Linking.openURL('tel:112') }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1890ff', marginBottom: 5 }}>
            {result.percentage}%
          </Text>
          <Text style={{ fontSize: 14, color: '#1890ff', opacity: 0.9 }}>
            Risk Oranı
          </Text>
        </View>

        <Chip
          style={{
            backgroundColor: getRiskLevelColor(result.riskLevel),
            alignSelf: 'center',
            marginBottom: 20
          }}
          textStyle={{ color: '#fff', fontWeight: 'bold' }}
        >
          {getRiskLevelText(result.riskLevel)}
        </Chip>

        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>
              Önerimiz
            </Text>
            <Text style={{ fontSize: 16, color: '#666', lineHeight: 22 }}>
              {result.recommendation}
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 20 }}>
          <Card.Content>

            <View style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>Dikkat Eksikliği</Text>
                <Text style={{ fontSize: 12, color: '#666', fontWeight: '500' }}>
                  {categoryScores.attention}/27
                </Text>
              </View>
              {getProgressBar(Math.round((categoryScores.attention / 27) * 100), "#1890ff")}
            </View>

            <Divider style={{ marginVertical: 15 }} />

            <View style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>Hiperaktivite</Text>
                <Text style={{ fontSize: 12, color: '#666', fontWeight: '500' }}>
                  {categoryScores.hyperactivity}/18
                </Text>
              </View>
              {getProgressBar(Math.round((categoryScores.hyperactivity / 18) * 100), "#faad14")}
            </View>

            <Divider style={{ marginVertical: 15 }} />

            <View style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>Dürtüsellik</Text>
                <Text style={{ fontSize: 12, color: '#666', fontWeight: '500' }}>
                  {categoryScores.impulsivity}/18
                </Text>
              </View>
              {getProgressBar(Math.round((categoryScores.impulsivity / 18) * 100), "#52c41a")}
            </View>
          </Card.Content>
        </Card>

        <Card style={{ backgroundColor: '#fff7e6', borderColor: '#ffe58f' }}>
          <Card.Content>
            <Text style={{ fontSize: 14, color: '#faad14', textAlign: 'center', fontWeight: '500' }}>
              ⚠️ Bu test sadece bilgilendirme amaçlıdır. Tıbbi tanı değildir!
            </Text>
          </Card.Content>
        </Card>

          <View style={{ marginTop: 15 }}>
              <Button
                  onPress={() => navigation.navigate('Home')}
                  style={{ marginBottom: 15 }}
                  icon="home"
              >
                  Ana Sayfaya Dön
              </Button>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;
