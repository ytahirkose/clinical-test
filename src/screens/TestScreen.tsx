import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Card, Button, ProgressBar, Checkbox, useTheme} from 'react-native-paper';
import { testTypes } from '../data/testTypes';
import { Answer, TestType } from '../types';
import { calculateScore } from '../utils/scoreCalculator';

type TestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Test'>;
type TestScreenRouteProp = RouteProp<RootStackParamList, 'Test'>;

interface Props {
  navigation: TestScreenNavigationProp;
  route: TestScreenRouteProp;
}

const TestScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { testType, userSelection } = route.params;

  const selectedTest = useMemo(() => testTypes.find(t => t.id === testType.id), [testType]);
  const questions = useMemo(() => selectedTest?.questions || [], [selectedTest]);
  const answerOptions = useMemo(() => selectedTest?.answerOptions || [], [selectedTest]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [progress, setProgress] = useState(0);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const totalQuestions = useMemo(() => questions.length, [questions]);

  const completeTest = useCallback(() => {
    if (!selectedTest) {
      Alert.alert('Hata', 'Test tipi bulunamadı.');
      return;
    }

    const missingAnswers = questions
      .filter((_, index) => !answers.find(a => a.questionId === index + 1))
      .map((_, index) => ({
        questionId: index + 1,
        value: 0,
      }));

    if (answers.length < questions.length) {
      const allAnswers = [...answers, ...missingAnswers];
      const result = calculateScore(allAnswers, selectedTest);
      navigation.navigate('Result', {
        score: result.score,
        answers: allAnswers.map(a => a.value),
        testType: selectedTest,
        userSelection: userSelection
      });
    } else {
      const result = calculateScore(answers, selectedTest);
      navigation.navigate('Result', {
        score: result.score,
        answers: answers.map(a => a.value),
        testType: selectedTest,
        userSelection: userSelection
      });
    }
  }, [selectedTest, questions, answers, navigation, userSelection]);

  const handleAnswer = useCallback((value: number) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
    };

    const existingAnswerIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress((currentQuestionIndex + 1) / totalQuestions);
    } else {
      completeTest();
    }
  }, [currentQuestion, answers, currentQuestionIndex, totalQuestions, completeTest]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setProgress((currentQuestionIndex - 1) / totalQuestions);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const handleSkip = useCallback(() => {
    Alert.alert(
      'Soru Atlanıyor',
      'Bu soruyu atlamak istediğinizden emin misiniz? Atlanan sorular 0 puan olarak değerlendirilir.',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Atla',
          onPress: () => handleAnswer(0),
        },
      ]
    );
  }, [handleAnswer]);

  const getProgressBar = () => {
    const progressPercent = (progress * 100);
    return (
      <View style={{
        height: 8,
        backgroundColor: theme.colors.outline,
        borderRadius: 4,
        overflow: 'hidden',
        width: '100%'
      }}>
        <View style={{
          height: '100%',
          backgroundColor: theme.colors.primary,
          borderRadius: 4,
          width: `${progressPercent}%`
        }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ backgroundColor: theme.colors.surface, padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.outline }}>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Soru {currentQuestionIndex + 1} / {totalQuestions}
          </Text>
        </View>
        <ProgressBar progress={(currentQuestionIndex + 1) / totalQuestions} color={theme.colors.primary} />
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>

          <Card style={{marginBottom: 10}}>
            <Card.Content>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, lineHeight: 26, textAlign: 'center', fontWeight: '500' }}>
                  {currentQuestion.text}
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card>
            <Card.Title
              title="Cevap Seçenekleri"
              left={() => <ProgressBar progress={0.8} color={theme.colors.secondary} />}
            />
            <Card.Content>
              {answerOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.outline,
                    marginBottom: 10,
                    backgroundColor: answers.find(a => a.questionId === currentQuestion.id)?.value === option.value
                      ? theme.colors.primaryContainer
                      : 'transparent',
                    borderRadius: 8,
                    paddingHorizontal: 15
                  }}
                  onPress={() => handleAnswer(option.value)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      flex: 1
                    }}>
                      {option.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
            <Button
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}
              style={{ flex: 1, marginRight: 10 }}
            >
              Önceki
            </Button>

            <Button
              onPress={handleSkip}
              style={{ flex: 1, marginHorizontal: 10 }}
            >
              Atla
            </Button>

            <Button
              onPress={completeTest}
              style={{ flex: 1, marginLeft: 10 }}
            >
              Tamamla
            </Button>
          </View>

          <View style={{ height: 10 }} />
        </ScrollView>

      <View style={{ backgroundColor: theme.colors.tertiaryContainer, padding: 15, borderTopWidth: 1, borderTopColor: theme.colors.tertiary }}>
        <Text style={{ fontSize: 14, textAlign: 'center' }}>
          Bu test sadece bilgilendirme amaçlıdır. Tıbbi tanı yerine geçmez.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;
