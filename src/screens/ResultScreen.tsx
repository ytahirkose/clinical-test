import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, useTheme } from 'react-native-paper';
import { calculateScore, getCategoryScores } from '../utils/scoreCalculator';
import { Answer } from '../types';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface Props {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
}

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { score, answers, testType, userSelection } = route.params;

  const answerObjects: Answer[] = answers.map((value, index) => ({
    questionId: index + 1,
    value
  }));

  const categoryScores = getCategoryScores(answerObjects, testType);

  const getRiskLevel = (score: number) => {
    if (score <= 16) return { level: 'low', label: 'Düşük Risk', color: theme.colors.primary };
    if (score <= 23) return { level: 'medium', label: 'Orta Risk', color: theme.colors.tertiary };
    return { level: 'high', label: 'Yüksek Risk', color: theme.colors.error };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return theme.colors.primary;
      case 'medium': return theme.colors.tertiary;
      case 'high': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };

  const getProgressBar = (percentage: number, color: string) => (
    <View style={{ height: 8, backgroundColor: theme.colors.outline, borderRadius: 4, overflow: 'hidden' }}>
      <View style={{
        height: '100%',
        backgroundColor: color,
        borderRadius: 4,
        width: `${percentage}%`
      }} />
    </View>
  );

  const riskInfo = getRiskLevel(score);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 5, color: theme.colors.primary }}>
            {score}
          </Text>
          <Text style={{ fontSize: 14, opacity: 0.9, color: theme.colors.onSurface }}>
            Toplam Puan
          </Text>
        </View>

        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: theme.colors.onSurface }}>
              Risk Seviyesi
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: riskInfo.color, marginBottom: 16 }}>
              {riskInfo.label}
            </Text>
            <View style={{ height: 8, backgroundColor: theme.colors.outline, borderRadius: 4, overflow: 'hidden' }}>
              <View style={{
                height: '100%',
                backgroundColor: riskInfo.color,
                borderRadius: 4,
                width: `${Math.min((score / 72) * 100, 100)}%`
              }} />
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.onSurface }}>
              Kategori Bazında Değerlendirme
            </Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: theme.colors.onSurface }}>
                Dikkat Eksikliği
              </Text>
              {getProgressBar(Math.round((categoryScores.attention / 27) * 100), theme.colors.primary)}
              <Text style={{ fontSize: 14, marginTop: 4, color: theme.colors.onSurfaceVariant }}>
                {categoryScores.attention} / 27 puan
              </Text>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: theme.colors.onSurface }}>
                Hiperaktivite
              </Text>
              {getProgressBar(Math.round((categoryScores.hyperactivity / 18) * 100), theme.colors.tertiary)}
              <Text style={{ fontSize: 14, marginTop: 4, color: theme.colors.onSurfaceVariant }}>
                {categoryScores.hyperactivity} / 18 puan
              </Text>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: theme.colors.onSurface }}>
                Dürtüsellik
              </Text>
              {getProgressBar(Math.round((categoryScores.impulsivity / 18) * 100), theme.colors.primary)}
              <Text style={{ fontSize: 14, marginTop: 4, color: theme.colors.onSurfaceVariant }}>
                {categoryScores.impulsivity} / 18 puan
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ backgroundColor: theme.colors.tertiaryContainer, borderColor: theme.colors.tertiary }}>
          <Card.Content>
            <Text style={{ fontSize: 14, textAlign: 'center', fontWeight: '500', color: theme.colors.onTertiaryContainer }}>
              ⚠️ Bu sonuçlar sadece bilgilendirme amaçlıdır. Kesin tanı için uzman görüşü gerekir.
            </Text>
          </Card.Content>
        </Card>

        <View style={{ marginTop: 24 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Home')}
            style={{ marginBottom: 12 }}
          >
            Ana Sayfaya Dön
          </Button>
          
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
