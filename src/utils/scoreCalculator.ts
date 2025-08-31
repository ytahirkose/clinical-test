import { Answer, TestResult, TestType } from '../types';
import { asrsRiskBands, vanderbiltRiskBands } from '../data/testTypes';

export const calculateScore = (answers: Answer[], testType: TestType): TestResult => {
  let totalScore = 0;

  answers.forEach(answer => {
    totalScore += answer.value;
  });

  const percentage = Math.round((totalScore / testType.maxScore) * 100);

  let riskLevel: 'low' | 'medium' | 'high';
  let riskBand: string;
  let recommendation: string;
  let screenerResult: boolean | undefined;

  if (testType.id.startsWith('asrs')) {
    if (totalScore < 17) {
      riskLevel = 'low';
      riskBand = 'Negatif (0-16)';
      recommendation = "ASRS v1.1 sonucu negatif. DEHB belirtileri düşük seviyede görünüyor. Ancak bu sadece bir ön taramadır ve kesin tanı koymaz.";
    } else {
      riskLevel = 'high';
      riskBand = 'Pozitif (17+)';
      recommendation = "ASRS v1.1 sonucu pozitif. DEHB belirtileri yüksek seviyede görünüyor. Mutlaka bir psikiyatrist veya nörolog ile görüşmeniz gerekli.";
    }

    if (testType.id === 'asrs-screener') {
      const markedBoxes = answers.filter(a => a.value >= 2).length;
      screenerResult = markedBoxes >= 4;
      
      if (screenerResult) {
        recommendation += " Koyu kutulardan en az 4'ü işaretli - ileri değerlendirme önerilir.";
      }
    }
  } else {
    if (totalScore < 6) {
      riskLevel = 'low';
      riskBand = 'Düşük Risk (0-5)';
      recommendation = "Vanderbilt sonucu düşük risk. DEHB belirtileri düşük seviyede görünüyor. Ancak bu sadece bir ön taramadır ve kesin tanı koymaz.";
    } else {
      riskLevel = 'high';
      riskBand = 'Yüksek Risk (6+)';
      recommendation = "Vanderbilt sonucu yüksek risk. DEHB belirtileri yüksek seviyede görünüyor. Mutlaka bir çocuk gelişim uzmanı veya psikiyatrist ile görüşmeniz gerekli.";
    }
  }

  return {
    score: totalScore,
    percentage,
    riskLevel,
    riskBand,
    recommendation,
    answers,
    screenerResult
  };
};

export const getCategoryScores = (answers: Answer[], testType: TestType) => {
  const categoryScores = {
    attention: 0,
    hyperactivity: 0,
    impulsivity: 0
  };

  answers.forEach(answer => {
    const question = testType.questions.find(q => q.id === answer.questionId);
    if (question) {
      categoryScores[question.category] += answer.value;
    }
  });

  return categoryScores;
};

export const checkDSM5Criteria = (answers: Answer[], testType: TestType) => {
  if (!testType.id.startsWith('asrs') && !testType.id.startsWith('vanderbilt')) return null;

  const attentionQuestions = testType.questions.filter(q => q.category === 'attention');
  const hyperactivityQuestions = testType.questions.filter(q => q.category === 'hyperactivity' || q.category === 'impulsivity');

  const attentionScore = answers
    .filter(a => attentionQuestions.find(q => q.id === a.questionId))
    .reduce((sum, a) => sum + a.value, 0);

  const hyperactivityScore = answers
    .filter(a => hyperactivityQuestions.find(q => q.id === a.questionId))
    .reduce((sum, a) => sum + a.value, 0);

  // DSM-5 thresholds vary by test type
  let attentionThreshold: number;
  let hyperactivityThreshold: number;

  if (testType.id.startsWith('asrs')) {
    // ASRS: 6+ symptoms in each domain (0-4 scale, threshold 2+ = moderate)
    attentionThreshold = 12; // 6 questions × 2 points
    hyperactivityThreshold = 12; // 6 questions × 2 points
  } else if (testType.id.startsWith('vanderbilt')) {
    // Vanderbilt: 6+ symptoms in each domain (0-3 scale, threshold 2+ = often)
    attentionThreshold = 12; // 6 questions × 2 points
    hyperactivityThreshold = 12; // 6 questions × 2 points
  } else {
    attentionThreshold = 12;
    hyperactivityThreshold = 12;
  }

  return {
    attentionMet: attentionScore >= attentionThreshold,
    hyperactivityMet: hyperactivityScore >= hyperactivityThreshold,
    attentionScore,
    hyperactivityScore,
    attentionThreshold,
    hyperactivityThreshold,
    testType: testType.id
  };
};
