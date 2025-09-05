import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Card, ProgressBar, Checkbox, useTheme} from 'react-native-paper';
import NativeButton from '../components/NativeButton';
import { createTestTypes } from '../data/testTypes';
import { Answer, TestType } from '../types';
import { calculateScore } from '../utils/scoreCalculator';
import { useTranslation } from 'react-i18next';

type TestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Test'>;
type TestScreenRouteProp = RouteProp<RootStackParamList, 'Test'>;

interface Props {
  navigation: TestScreenNavigationProp;
  route: TestScreenRouteProp;
}

const TestScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { testType, userSelection } = route.params;

  const selectedTest = useMemo(() => testType, [testType]);
  const questions = useMemo(() => selectedTest?.questions || [], [selectedTest]);
  const answerOptions = useMemo(() => selectedTest?.answerOptions || [], [selectedTest]);
  const testTypes = useMemo(() => createTestTypes(t), [t]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [progress, setProgress] = useState(0);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const totalQuestions = useMemo(() => questions.length, [questions]);

  const completeTest = useCallback(() => {
    if (!selectedTest) {
      Alert.alert(t('common.error'), t('test.testTypeNotFound'));
      return;
    }

    // Validate that all questions have answers with correct IDs
    const missingAnswers = questions
      .filter((question) => !answers.find(a => a.questionId === question.id))
      .map((question) => ({
        questionId: question.id, // Use actual question ID
        value: 0,
      }));

    if (answers.length < questions.length) {
      const allAnswers = [...answers, ...missingAnswers];
      const result = calculateScore(allAnswers, selectedTest, t);
      navigation.navigate('Result', {
        score: result.score,
        answers: allAnswers.map(a => a.value),
        testType: selectedTest,
        userSelection: userSelection
      });
    } else {
      const result = calculateScore(answers, selectedTest, t);
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
      t('test.skipQuestion'),
      t('test.skipWarning'),
      [
        {
          text: t('test.cancel'),
          style: 'cancel',
        },
        {
          text: t('test.skip'),
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
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.onSurface }}>
            {t('test.question')} {currentQuestionIndex + 1} / {totalQuestions}
          </Text>
        </View>
        <ProgressBar progress={(currentQuestionIndex + 1) / totalQuestions} color={theme.colors.primary} />
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>

          <Card style={{marginBottom: 10}}>
            <Card.Content>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, lineHeight: 26, textAlign: 'center', fontWeight: '500', color: theme.colors.onSurface }}>
                  {currentQuestion.text}
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card>
            <Card.Title
              title={t('test.answerOptions')}
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
                      flex: 1,
                      color: theme.colors.onSurface
                    }}>
                      {option.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
            <NativeButton
              variant="outlined"
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}
              style={{ flex: 1, marginRight: 10 }}
            >
              {t('test.previous')}
            </NativeButton>

            <NativeButton
              variant="outlined"
              onPress={handleSkip}
              style={{ flex: 1, marginHorizontal: 10 }}
            >
              {t('test.skip')}
            </NativeButton>

            <NativeButton
              variant="contained"
              onPress={completeTest}
              style={{ flex: 1, marginLeft: 10 }}
            >
              {t('test.finish')}
            </NativeButton>
          </View>

          <View style={{ height: 10 }} />
        </ScrollView>

      <View style={{ backgroundColor: theme.colors.tertiaryContainer, padding: 15, borderTopWidth: 1, borderTopColor: theme.colors.tertiary }}>
        <Text style={{ fontSize: 14, textAlign: 'center', color: theme.colors.onTertiaryContainer }}>
          {t('testSelection.disclaimer')}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;
