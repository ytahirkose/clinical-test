import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Card, Button, ProgressBar, Checkbox} from 'react-native-paper';
import { testTypes } from '../data/testTypes';
import { Answer } from '../types';
import { calculateScore } from '../utils/scoreCalculator';

type TestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Test'>;
type TestScreenRouteProp = RouteProp<RootStackParamList, 'Test'>;

interface Props {
  navigation: TestScreenNavigationProp;
  route: TestScreenRouteProp;
}

const TestScreen: React.FC<Props> = ({ navigation, route }) => {
  const { testType } = route.params;

  const selectedTest = testTypes.find(t => t.id === testType);
  const questions = selectedTest?.questions || [];
  const answerOptions = selectedTest?.answerOptions || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [progress, setProgress] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

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
  }, [currentQuestionIndex, answers, totalQuestions]);

  const completeTest = () => {
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
        userSelection: route.params.userSelection
      });
    } else {
      const result = calculateScore(answers, selectedTest);
      navigation.navigate('Result', {
        score: result.score,
        answers: answers.map(a => a.value),
        testType: selectedTest,
        userSelection: route.params.userSelection
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setProgress((currentQuestionIndex - 1) / totalQuestions);
    }
  };

  const handleSkip = () => {
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
  };

  const getProgressBar = () => {
    const progressPercent = (progress * 100);
    return (
      <View style={{
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
        width: '100%'
      }}>
        <View style={{
          height: '100%',
          backgroundColor: '#1890ff',
          borderRadius: 4,
          width: `${progressPercent}%`
        }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
            Soru {currentQuestionIndex + 1} / {totalQuestions}
          </Text>
        </View>
        <ProgressBar progress={(currentQuestionIndex + 1) / totalQuestions} color="#1890ff" />
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}>

          <Card style={{marginBottom: 10}}>
            <Card.Content>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, color: '#333', lineHeight: 26, textAlign: 'center', fontWeight: '500' }}>
                  {currentQuestion.text}
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card>
            <Card.Title
              title="Cevap Seçenekleri"
              left={() => <ProgressBar progress={0.8} color="#52c41a" />}
            />
            <Card.Content>
              {answerOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f0f0f0',
                    marginBottom: 10,
                    backgroundColor: answers.find(a => a.questionId === currentQuestion.id)?.value === option.value
                      ? '#e6f7ff'
                      : 'transparent',
                    borderRadius: 8,
                    paddingHorizontal: 15
                  }}
                  onPress={() => handleAnswer(option.value)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#333',
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

      <View style={{ backgroundColor: '#fff7e6', padding: 15, borderTopWidth: 1, borderTopColor: '#ffe58f' }}>
        <Text style={{ fontSize: 14, color: '#faad14', textAlign: 'center' }}>
          Bu test sadece bilgilendirme amaçlıdır. Tıbbi tanı yerine geçmez.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;
