export interface AnswerType {
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface QuestionType {
  question: string;
  answers: AnswerType[];
}

export interface QuestionData {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
