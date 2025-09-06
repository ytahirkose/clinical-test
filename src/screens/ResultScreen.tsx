import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, useTheme } from 'react-native-paper';
import NativeButton from '../components/NativeButton';
import { calculateScore, getCategoryScores, checkDSM5Criteria } from '../utils/scoreCalculator';
import { Answer, TestType, UserSelection } from '../types';
import AdBanner from '../components/AdBanner';
import { showRetakeInterstitial } from '../components/InterstitialAd';
import { useTranslation } from 'react-i18next';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface Props {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
}

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { score, answers, testType, userSelection } = route.params;

  const testAnswers: Answer[] = answers.map((value: number, index: number) => {
    const question = testType.questions[index];
    return {
      questionId: question ? question.id : index + 1, // Use actual question ID or fallback
      value,
    };
  });

  const result = calculateScore(testAnswers, testType, t);
  const categoryScores = getCategoryScores(testAnswers, testType);
  const dsm5Criteria = checkDSM5Criteria(testAnswers, testType);

  const getRiskLevel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return { color: theme.colors.primary, text: t('result.lowRisk') };
      case 'medium':
        return { color: theme.colors.tertiary, text: t('result.moderateRisk') };
      case 'high':
        return { color: theme.colors.error, text: t('result.highRisk') };
      default:
        return { color: theme.colors.outline, text: t('result.unclear') };
    }
  };

  const riskLevelInfo = getRiskLevel(result.riskLevel);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: theme.colors.primary }}>
            {t('result.title')}
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: theme.colors.onSurface }}>
            {testType.name} {t('result.subtitle')}
          </Text>
        </View>

        <AdBanner position="top" screen="result" />

        <Card style={{ marginBottom: 20, backgroundColor: theme.colors.surface }}>
          <Card.Content>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
              {t('result.generalResult')}
            </Text>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 48, fontWeight: 'bold', color: riskLevelInfo.color }}>
                {result.score}
              </Text>
              <Text style={{ fontSize: 16, color: theme.colors.onSurfaceVariant }}>
                / {testType.maxScore} {t('result.points')}
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
              {t('result.categoryScores')}
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                {t('result.attention')}: {categoryScores.attention} {t('result.points')}
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                {t('result.hyperactivity')}: {categoryScores.hyperactivity} {t('result.points')}
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                {t('result.impulsivity')}: {categoryScores.impulsivity} {t('result.points')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {dsm5Criteria && (
          <Card style={{ marginBottom: 20, backgroundColor: theme.colors.tertiaryContainer }}>
            <Card.Content>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
              {t('result.dsm5Criteria')}
            </Text>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                  {t('result.attentionCriteria')}: {dsm5Criteria.attentionMet ? t('result.criteriaMet') : t('result.criteriaNotMet')}
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant }}>
                  {t('result.score')}: {dsm5Criteria.attentionScore} / {dsm5Criteria.attentionThreshold}
                </Text>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                  {t('result.hyperactivityCriteria')}: {dsm5Criteria.hyperactivityMet ? t('result.criteriaMet') : t('result.criteriaNotMet')}
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant }}>
                  {t('result.score')}: {dsm5Criteria.hyperactivityScore} / {dsm5Criteria.hyperactivityThreshold}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}

        <AdBanner position="bottom" screen="result" />

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <NativeButton
            variant="outlined"
            onPress={async () => {
              try {
                const shown = await showRetakeInterstitial();
                if (!shown) {
                  navigation.navigate('TestSelection');
                } else {
                  setTimeout(() => navigation.navigate('TestSelection'), 400);
                }
              } catch {
                navigation.navigate('TestSelection');
              }
            }}
          >
            {t('result.retake')}
          </NativeButton>
        </View>

        {/* Alt kısımda ek reklam */}
        <AdBanner position="bottom" screen="result" index={1} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;
