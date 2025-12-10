export interface Question {
    id: number;
    text: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: 'A' | 'B' | 'C' | 'D';
}

export interface QuestionHistory {
    id: number;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    options: { [key: string]: string };
}

export interface GameResult {
    userId: string;
    score: number;
    totalQuestions: number;
    passed: boolean;
    timestamp: string;
}

export interface ApiQuestion {
    id: number;
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: string;
}
