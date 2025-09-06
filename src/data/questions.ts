import { Question } from '../types';

export const createAsrsQuestions = (t: (key: string) => string): Question[] => [
  {
    id: 1,
    text: t('questions.asrs_1'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 2,
    text: t('questions.asrs_2'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 3,
    text: t('questions.asrs_3'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 4,
    text: t('questions.asrs_4'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 5,
    text: t('questions.asrs_5'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 6,
    text: t('questions.asrs_6'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 7,
    text: t('questions.asrs_7'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 8,
    text: t('questions.asrs_8'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 9,
    text: t('questions.asrs_9'),
    category: "hyperactivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 10,
    text: t('questions.asrs_10'),
    category: "hyperactivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 11,
    text: t('questions.asrs_11'),
    category: "hyperactivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 12,
    text: t('questions.asrs_12'),
    category: "hyperactivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 13,
    text: t('questions.asrs_13'),
    category: "hyperactivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 14,
    text: t('questions.asrs_14'),
    category: "hyperactivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 15,
    text: t('questions.asrs_15'),
    category: "impulsivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 16,
    text: t('questions.asrs_16'),
    category: "impulsivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 17,
    text: t('questions.asrs_17'),
    category: "impulsivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  },
  {
    id: 18,
    text: t('questions.asrs_18'),
    category: "impulsivity",
    weight: 1,
    source: "ASRS v1.1 - Harvard Medical School"
  }
];

export const createAsrsScreenerQuestions = (t: (key: string) => string): Question[] => [
  {
    id: 1,
    text: t('questions.asrs_1'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 Screener - Harvard Medical School"
  },
  {
    id: 2,
    text: t('questions.asrs_2'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 Screener - Harvard Medical School"
  },
  {
    id: 3,
    text: t('questions.asrs_3'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 Screener - Harvard Medical School"
  },
  {
    id: 4,
    text: t('questions.asrs_4'),
    category: "attention",
    weight: 1,
    source: "ASRS v1.1 Screener - Harvard Medical School"
  },
  {
    id: 5,
    text: t('questions.asrs_9'),
    category: "hyperactivity",
    weight: 1,
    source: "ASRS v1.1 Screener - Harvard Medical School"
  },
  {
    id: 6,
    text: t('questions.asrs_16'),
    category: "impulsivity",
    weight: 1,
    source: "ASRS v1.1 Screener - Harvard Medical School"
  }
];

export const createVanderbiltParentQuestions = (t: (key: string) => string): Question[] => [
  {
    id: 1,
    text: t('questions.vanderbilt_1'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 2,
    text: t('questions.vanderbilt_2'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 3,
    text: t('questions.vanderbilt_3'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 4,
    text: t('questions.vanderbilt_4'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 5,
    text: t('questions.vanderbilt_5'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 6,
    text: t('questions.vanderbilt_6'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 7,
    text: t('questions.vanderbilt_7'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 8,
    text: t('questions.vanderbilt_8'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 9,
    text: t('questions.vanderbilt_9'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 10,
    text: t('questions.vanderbilt_10'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 11,
    text: t('questions.vanderbilt_11'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 12,
    text: t('questions.vanderbilt_12'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 13,
    text: t('questions.vanderbilt_13'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 14,
    text: t('questions.vanderbilt_14'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 15,
    text: t('questions.vanderbilt_15'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 16,
    text: t('questions.vanderbilt_16'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 17,
    text: t('questions.vanderbilt_17'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  },
  {
    id: 18,
    text: t('questions.vanderbilt_18'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Parent"
  }
];

export const createVanderbiltTeacherQuestions = (t: (key: string) => string): Question[] => [
  {
    id: 1,
    text: t('questions.vanderbilt_1'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 2,
    text: t('questions.vanderbilt_2'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 3,
    text: t('questions.vanderbilt_3'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 4,
    text: t('questions.vanderbilt_4'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 5,
    text: t('questions.vanderbilt_5'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 6,
    text: t('questions.vanderbilt_6'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 7,
    text: t('questions.vanderbilt_7'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 8,
    text: t('questions.vanderbilt_8'),
    category: "attention",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 9,
    text: t('questions.vanderbilt_9'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 10,
    text: t('questions.vanderbilt_10'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 11,
    text: t('questions.vanderbilt_11'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 12,
    text: t('questions.vanderbilt_12'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 13,
    text: t('questions.vanderbilt_13'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 14,
    text: t('questions.vanderbilt_14'),
    category: "hyperactivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 15,
    text: t('questions.vanderbilt_15'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 16,
    text: t('questions.vanderbilt_16'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 17,
    text: t('questions.vanderbilt_17'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  },
  {
    id: 18,
    text: t('questions.vanderbilt_18'),
    category: "impulsivity",
    weight: 1,
    source: "NICHQ Vanderbilt Assessment Scale - Teacher"
  }
];

export const createAsrsAnswerOptions = (t: (key: string) => string) => [
  { value: 0, label: t('answers.never') },
  { value: 1, label: t('answers.rarely') },
  { value: 2, label: t('answers.sometimes') },
  { value: 3, label: t('answers.often') },
  { value: 4, label: t('answers.veryOften') }
];

export const createVanderbiltAnswerOptions = (t: (key: string) => string) => [
  { value: 0, label: t('answers.never') },
  { value: 1, label: t('answers.rarely') },
  { value: 2, label: t('answers.sometimes') },
  { value: 3, label: t('answers.often') }
];

