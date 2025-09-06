import { TestType } from '../types';
import { 
  createAsrsQuestions,
  createVanderbiltParentQuestions, 
  createVanderbiltTeacherQuestions,
  createAsrsScreenerQuestions,
  createAsrsAnswerOptions,
  createVanderbiltAnswerOptions,
  asrsQuestions, 
  vanderbiltParentQuestions, 
  vanderbiltTeacherQuestions,
  asrsScreenerQuestions,
  asrsAnswerOptions,
  vanderbiltAnswerOptions
} from './questions';

export const createTestTypes = (t: (key: string) => string): TestType[] => [

  {
    id: 'asrs',
    name: t('testSelection.testTypes.asrs.name'),
    description: t('testSelection.testTypes.asrs.description'),
    ageRange: t('testSelection.testTypes.asrs.ageRange'),
    questions: createAsrsQuestions(t),
    answerOptions: createAsrsAnswerOptions(t),
    maxScore: 72,
    cutoffScore: 17,
    source: t('testSelection.testTypes.asrs.source')
  },
  {
    id: 'asrs-screener',
    name: t('testSelection.testTypes.asrsScreener.name'),
    description: t('testSelection.testTypes.asrsScreener.description'),
    ageRange: t('testSelection.testTypes.asrsScreener.ageRange'),
    questions: createAsrsScreenerQuestions(t),
    answerOptions: createAsrsAnswerOptions(t),
    maxScore: 24,
    cutoffScore: 4,
    source: t('testSelection.testTypes.asrsScreener.source')
  },
  {
    id: 'vanderbilt-parent',
    name: t('testSelection.testTypes.vanderbiltParent.name'),
    description: t('testSelection.testTypes.vanderbiltParent.description'),
    ageRange: t('testSelection.testTypes.vanderbiltParent.ageRange'),
    questions: createVanderbiltParentQuestions(t),
    answerOptions: createVanderbiltAnswerOptions(t),
    maxScore: 54,
    cutoffScore: 6,
    source: t('testSelection.testTypes.vanderbiltParent.source')
  },
  {
    id: 'vanderbilt-teacher',
    name: t('testSelection.testTypes.vanderbiltTeacher.name'),
    description: t('testSelection.testTypes.vanderbiltTeacher.description'),
    ageRange: t('testSelection.testTypes.vanderbiltTeacher.ageRange'),
    questions: createVanderbiltTeacherQuestions(t),
    answerOptions: createVanderbiltAnswerOptions(t),
    maxScore: 54,
    cutoffScore: 6,
    source: t('testSelection.testTypes.vanderbiltTeacher.source')
  }
];

export const createRiskBands = (t: (key: string) => string) => ({
  asrs: {
    '0-16': t('testSelection.riskBands.asrs.negative'),
    '17+': t('testSelection.riskBands.asrs.positive')
  },
  vanderbilt: {
    '0-5': t('testSelection.riskBands.vanderbilt.lowRisk'),
    '6+': t('testSelection.riskBands.vanderbilt.highRisk')
  }
});

export const asrsRiskBands = (t: (key: string) => string) => ({
  '0-16': t('testSelection.riskBands.asrs.negative'),
  '17+': t('testSelection.riskBands.asrs.positive')
});

export const vanderbiltRiskBands = (t: (key: string) => string) => ({
  '0-5': t('testSelection.riskBands.vanderbilt.lowRisk'),
  '6+': t('testSelection.riskBands.vanderbilt.highRisk')
});
