import axios from "axios";
import { Quiz, Question, QuizAttempt, QuizAnswer } from "../../../Database/types";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({ 
  withCredentials: true,
  baseURL: HTTP_SERVER,
});

// Get all quizzes for a course
export const findQuizzesForCourse = async (courseId: string): Promise<Quiz[]> => {
  const { data } = await axiosWithCredentials.get<Quiz[]>(`/api/courses/${courseId}/quizzes`); // FIXED!
  return data;
};

// Get a specific quiz
export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.get<Quiz>(`/api/quizzes/${quizId}`);
  return data;
};

// Create a new quiz
export const createQuiz = async (courseId: string, quiz: Partial<Quiz>): Promise<Quiz> => {
  try {
    console.log("[createQuiz] Creating quiz for course:", courseId);
    const response = await axiosWithCredentials.post<Quiz>(`/api/courses/${courseId}/quizzes`, quiz);
    console.log("[createQuiz] Response received:", response.status, response.data?._id);
    return response.data;
  } catch (error) {
    console.error("[createQuiz] Error:", error);
    if (axios.isAxiosError(error)) {
      console.error("[createQuiz] Response:", error.response?.data);
      console.error("[createQuiz] Status:", error.response?.status);
    }
    throw error;
  }
};

// Update quiz
export const updateQuiz = async (quizId: string, quiz: Partial<Quiz>): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put<Quiz>(`/api/quizzes/${quizId}`, quiz);
  return data;
};

// Publish quiz
export const publishQuiz = async (quizId: string): Promise<void> => {
  await axiosWithCredentials.put(`/api/quizzes/${quizId}/publish`);
};

// Unpublish quiz
export const unpublishQuiz = async (quizId: string): Promise<void> => {
  await axiosWithCredentials.put(`/api/quizzes/${quizId}/unpublish`);
};

// Delete quiz
export const deleteQuiz = async (quizId: string): Promise<{ message: string }> => {
  const { data } = await axiosWithCredentials.delete<{ message: string }>(`/api/quizzes/${quizId}`);
  return data;
};

// Add question to quiz
export const addQuestion = async (quizId: string, question: Partial<Question>): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.post<Quiz>(`/api/quizzes/${quizId}/questions`, question);
  return data;
};

// Update question
export const updateQuestion = async (quizId: string, questionId: string, question: Partial<Question>): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put<Quiz>(`/api/quizzes/${quizId}/questions/${questionId}`, question);
  return data;
};

// Delete question
export const deleteQuestion = async (quizId: string, questionId: string): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.delete<Quiz>(`/api/quizzes/${quizId}/questions/${questionId}`);
  return data;
};

// Submit quiz attempt
export const submitQuizAttempt = async (quizId: string, userId: string, answers: QuizAnswer[], startedAt?: Date): Promise<QuizAttempt> => {
  const { data } = await axiosWithCredentials.post<QuizAttempt>(`/api/quizzes/${quizId}/attempts`, {
    userId,
    answers,
    startedAt: startedAt || new Date(),
  });
  return data;
};

// Get user's attempts for a quiz
export const getUserAttempts = async (quizId: string, userId: string): Promise<QuizAttempt[]> => {
  const { data } = await axiosWithCredentials.get<QuizAttempt[]>(`/api/quizzes/${quizId}/attempts/user/${userId}`);
  return data;
};

// Get latest attempt
export const getLatestAttempt = async (quizId: string, userId: string): Promise<QuizAttempt | null> => {
  const { data } = await axiosWithCredentials.get<QuizAttempt | null>(`/api/quizzes/${quizId}/attempts/user/${userId}/latest`);
  return data;
};