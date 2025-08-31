import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, useTheme } from 'react-native-paper';
import { calculateScore, getCategoryScores, checkDSM5Criteria } from '../utils/scoreCalculator';
import { Answer, TestType, UserSelection } from '../types';
import AdBanner from '../components/AdBanner';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface Props {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
}

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { score, answers, testType, userSelection } = route.params;

  const testAnswers: Answer[] = answers.map((value: number, index: number) => {
    // Find the actual question ID from the test type
    const question = testType.questions[index];
    return {
      questionId: question ? question.id : index + 1, // Use actual question ID or fallback
      value,
    };
  });

  const result = calculateScore(testAnswers, testType);
  const categoryScores = getCategoryScores(testAnswers, testType);
  const dsm5Criteria = checkDSM5Criteria(testAnswers, testType);

  const getRiskLevel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return { color: theme.colors.primary, text: 'Düşük Risk' };
      case 'medium':
        return { color: theme.colors.tertiary, text: 'Orta Risk' };
      case 'high':
        return { color: theme.colors.error, text: 'Yüksek Risk' };
      default:
        return { color: theme.colors.outline, text: 'Belirsiz' };
    }
  };

  const riskLevelInfo = getRiskLevel(result.riskLevel);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: theme.colors.primary }}>
            Test Sonucu
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: theme.colors.onSurface }}>
            {testType.name} sonucunuz
          </Text>
        </View>

        <AdBanner position="top" />

        <Card style={{ marginBottom: 20, backgroundColor: theme.colors.surface }}>
          <Card.Content>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
              Genel Sonuç
            </Text>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 48, fontWeight: 'bold', color: riskLevelInfo.color }}>
                {result.score}
              </Text>
              <Text style={{ fontSize: 16, color: theme.colors.onSurfaceVariant }}>
                / {testType.maxScore} puan
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: riskLevelInfo.color }}>
                {riskLevelInfo.text}
              </Text>
              <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                {result.riskBand}
              </Text>
            </View>
            <Text style={{ fontSize: 14, lineHeight: 20, color: theme.colors.onSurface, textAlign: 'center' }}>
              {result.recommendation}
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 20, backgroundColor: theme.colors.surface }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
              Kategori Puanları
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                Dikkat: {categoryScores.attention} puan
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                Hiperaktivite: {categoryScores.hyperactivity} puan
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                Dürtüsellik: {categoryScores.impulsivity} puan
              </Text>
            </View>
          </Card.Content>
        </Card>

        {dsm5Criteria && (
          <Card style={{ marginBottom: 20, backgroundColor: theme.colors.tertiaryContainer }}>
            <Card.Content>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
                DSM-5 Kriterleri
              </Text>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                  Dikkat Kriteri: {dsm5Criteria.attentionMet ? '✅ Karşılandı' : '❌ Karşılanmadı'}
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant }}>
                  Puan: {dsm5Criteria.attentionScore} / {dsm5Criteria.attentionThreshold}
                </Text>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                  Hiperaktivite/Dürtüsellik: {dsm5Criteria.hyperactivityMet ? '✅ Karşılandı' : '❌ Karşılanmadı'}
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant }}>
                  Puan: {dsm5Criteria.hyperactivityScore} / {dsm5Criteria.hyperactivityThreshold}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}

        <AdBanner position="bottom" />

        <View style={{ marginTop: 20 }}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('TestSelection')}
          >
            Yeni Test
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;
