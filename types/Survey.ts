export interface SurveyOption {
  id: string;
  value: number;
  label: string;
}

export interface SurveyQuestion {
  question: string;
  options: SurveyOption[];
}

export interface SurveyQuestions {
  [key: number]: SurveyQuestion;
}

export interface SurveyAnswers {
  [key: string]: number;
}
