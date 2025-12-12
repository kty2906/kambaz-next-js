export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
  }
  
  export interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
  }
  
  export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons?: Lesson[];
  }
  
  export interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
  }
  
  export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
  }
  
  export interface Enrollment {
    _id: string;
    user: string;
    course: string;
  }

  export interface Question {
    _id: string;
    title: string;
    type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
    question: string;
    points: number;
    choices?: string[];
    correctChoice?: number;
    correctAnswer?: boolean;
    possibleAnswers?: string[];
  }

  export interface Quiz {
    _id: string;
    title: string;
    description: string;
    course: string;
    quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
    points: number;
    assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attemptsAllowed: number;
    showCorrectAnswers: "ALWAYS" | "IMMEDIATELY" | "AFTER_DUE_DATE" | "NEVER";
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: string;
    availableDate: string;
    availableUntilDate: string;
    published: boolean;
    questions: Question[];
  }

  export interface QuizAnswer {
    questionId: string;
    answer: string | number | boolean;
    isCorrect?: boolean;
    pointsAwarded?: number;
  }

  export interface QuizAttempt {
    _id: string;
    quiz: string;
    user: string;
    course: string;
    attemptNumber: number;
    startedAt: string;
    submittedAt: string | null;
    answers: QuizAnswer[];
    score: number;
    completed: boolean;
  }