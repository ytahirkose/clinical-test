export interface Question {
  id: number;
  text: string;
  category: 'attention' | 'hyperactivity' | 'impulsivity';
  weight: number;
  source: string;
}

export interface Answer {
  questionId: number;
  value: number;
}

export interface TestResult {
  score: number;
  percentage: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskBand: string;
  recommendation: string;
  answers: Answer[];
  screenerResult?: boolean;
}

export interface DisclaimerAgreement {
  accepted: boolean;
  timestamp: Date;
}

export interface TestType {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  questions: Question[];
  answerOptions: { value: number; label: string }[];
  maxScore: number;
  cutoffScore: number;
  source: string;
}

export interface UserSelection {
  age: number;
  testType?: string;
  relationship?: string;
}

export interface DisclaimerScreenRouteProp {
  params: {
    userSelection: UserSelection;
  };
}
