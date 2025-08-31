import { TestType } from '../types';
import { 
  asrsQuestions, 
  vanderbiltParentQuestions, 
  vanderbiltTeacherQuestions,
  asrsScreenerQuestions,
  asrsAnswerOptions,
  vanderbiltAnswerOptions
} from './questions';

export const testTypes: TestType[] = [
  {
    id: 'asrs',
    name: 'ASRS v1.1 Adult ADHD Self-Report Scale',
    description: '18 yaş ve üzeri yetişkinler için Harvard Medical School tarafından geliştirilmiş DEHB tarama ölçeği',
    ageRange: '18+ yaş',
    questions: asrsQuestions,
    answerOptions: asrsAnswerOptions,
    maxScore: 72,
    cutoffScore: 14,
    source: 'Harvard Medical School - WHO ASRS v1.1'
  },
  {
    id: 'asrs-screener',
    name: 'ASRS v1.1 6 Soruluk Screener',
    description: 'ASRS v1.1\'in 6 soruluk kısa versiyonu - koyu kutulardan en az 4\'ü işaretliyse ileri değerlendirme önerilir',
    ageRange: '18+ yaş',
    questions: asrsScreenerQuestions,
    answerOptions: asrsAnswerOptions,
    maxScore: 24,
    cutoffScore: 14,
    source: 'Harvard Medical School - ASRS v1.1 Screener'
  },
  {
    id: 'vanderbilt-parent',
    name: 'NICHQ Vanderbilt Assessment Scale - Ebeveyn Formu',
    description: '4-17 yaş arası çocuk ve ergenler için ebeveyn tarafından doldurulan DEHB tarama ölçeği',
    ageRange: '4-17 yaş',
    questions: vanderbiltParentQuestions,
    answerOptions: vanderbiltAnswerOptions,
    maxScore: 60,
    cutoffScore: 6,
    source: 'NICHQ Vanderbilt - Ebeveyn Formu'
  },
  {
    id: 'vanderbilt-teacher',
    name: 'NICHQ Vanderbilt Assessment Scale - Öğretmen Formu',
    description: '4-17 yaş arası çocuk ve ergenler için öğretmen tarafından doldurulan DEHB tarama ölçeği',
    ageRange: '4-17 yaş',
    questions: vanderbiltTeacherQuestions,
    answerOptions: vanderbiltAnswerOptions,
    maxScore: 60,
    cutoffScore: 6,
    source: 'NICHQ Vanderbilt - Öğretmen Formu'
  }
];

export const asrsRiskBands = {
  '0-9': 'Düşük Negatif',
  '10-13': 'Yüksek Negatif', 
  '14-17': 'Düşük Pozitif',
  '18-24': 'Yüksek Pozitif'
};

export const vanderbiltRiskBands = {
  '0-5': 'Düşük Risk',
  '6-9': 'Orta Risk',
  '10+': 'Yüksek Risk'
};
