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
    if (totalScore <= 9) {
      riskLevel = 'low';
      riskBand = '0-9 Düşük Negatif';
      recommendation = "ASRS v1.1 sonucu düşük negatif. DEHB belirtileri düşük seviyede görünüyor. Ancak bu sadece bir ön taramadır ve kesin tanı koymaz.";
    } else if (totalScore <= 13) {
      riskLevel = 'low';
      riskBand = '10-13 Yüksek Negatif';
      recommendation = "ASRS v1.1 sonucu yüksek negatif. DEHB belirtileri düşük-orta seviyede görünüyor. Bir uzmanla görüşmeniz faydalı olabilir.";
    } else if (totalScore <= 17) {
      riskLevel = 'medium';
      riskBand = '14-17 Düşük Pozitif';
      recommendation = "ASRS v1.1 sonucu düşük pozitif. DEHB belirtileri orta seviyede görünüyor. Bir psikiyatrist veya nörolog ile görüşmeniz önerilir.";
    } else {
      riskLevel = 'high';
      riskBand = '18-24 Yüksek Pozitif';
      recommendation = "ASRS v1.1 sonucu yüksek pozitif. DEHB belirtileri yüksek seviyede görünüyor. Mutlaka bir psikiyatrist veya nörolog ile görüşmeniz gerekli.";
    }

    if (testType.id === 'asrs-screener') {
      const markedBoxes = answers.filter(a => a.value >= 2).length;
      screenerResult = markedBoxes >= 4;
      
      if (screenerResult) {
        recommendation += " Koyu kutulardan en az 4'ü işaretli - ileri değerlendirme önerilir.";
      }
    }
  } else {
    if (totalScore <= 5) {
      riskLevel = 'low';
      riskBand = '0-5 Düşük Risk';
      recommendation = "Vanderbilt sonucu düşük risk. DEHB belirtileri düşük seviyede görünüyor. Ancak bu sadece bir ön taramadır ve kesin tanı koymaz.";
    } else if (totalScore <= 9) {
      riskLevel = 'medium';
      riskBand = '6-9 Orta Risk';
      recommendation = "Vanderbilt sonucu orta risk. DEHB belirtileri orta seviyede görünüyor. Bir çocuk gelişim uzmanı veya psikiyatrist ile görüşmeniz önerilir.";
    } else {
      riskLevel = 'high';
      riskBand = '10+ Yüksek Risk';
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
  if (!testType.id.startsWith('asrs')) return null;

  const attentionQuestions = testType.questions.filter(q => q.category === 'attention');
  const hyperactivityQuestions = testType.questions.filter(q => q.category === 'hyperactivity' || q.category === 'impulsivity');

  const attentionScore = answers
    .filter(a => attentionQuestions.find(q => q.id === a.questionId))
    .reduce((sum, a) => sum + a.value, 0);

  const hyperactivityScore = answers
    .filter(a => hyperactivityQuestions.find(q => q.id === a.questionId))
    .reduce((sum, a) => sum + a.value, 0);

  const attentionThreshold = 12;
  const hyperactivityThreshold = 12;

  return {
    attentionMet: attentionScore >= attentionThreshold,
    hyperactivityMet: hyperactivityScore >= hyperactivityThreshold,
    attentionScore,
    hyperactivityScore,
    attentionThreshold,
    hyperactivityThreshold
  };
};
