"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { findQuizById } from "../../client";
import { Quiz, Question } from "../../../../../Database/types";
import styles from "./page.module.css";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState<Date>(new Date());
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      setLastSaved(new Date());
    }, 30000);
    return () => clearInterval(autoSaveInterval);
  }, []);

  const fetchQuiz = async () => {
    try {
      const data = await findQuizById(qid as string);
      setQuiz(data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    setLastSaved(new Date());
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let score = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question._id!];
      if (question.type === "MULTIPLE_CHOICE" && question.choices && question.correctChoice !== undefined) {
        const correctAnswer = question.choices[question.correctChoice];
        if (userAnswer === correctAnswer) {
          score += question.points;
        }
      } else if (question.type === "TRUE_FALSE" && question.correctAnswer !== undefined) {
        const correctAnswer = question.correctAnswer ? "true" : "false";
        if (userAnswer === correctAnswer) {
          score += question.points;
        }
      } else if (question.type === "FILL_IN_BLANK" && question.possibleAnswers) {
        const normalizedAnswer = userAnswer?.toLowerCase().trim();
        const isCorrect = question.possibleAnswers.some(
          (ans) => ans.toLowerCase().trim() === normalizedAnswer
        );
        if (isCorrect) {
          score += question.points;
        }
      }
    });
    return score;
  };

  const isAnswerCorrect = (question: Question) => {
    const userAnswer = answers[question._id!];
    if (question.type === "MULTIPLE_CHOICE" && question.choices && question.correctChoice !== undefined) {
      const correctAnswer = question.choices[question.correctChoice];
      return userAnswer === correctAnswer;
    } else if (question.type === "TRUE_FALSE" && question.correctAnswer !== undefined) {
      const correctAnswer = question.correctAnswer ? "true" : "false";
      return userAnswer === correctAnswer;
    } else if (question.type === "FILL_IN_BLANK" && question.possibleAnswers) {
      const normalizedAnswer = userAnswer?.toLowerCase().trim();
      return question.possibleAnswers.some(
        (ans) => ans.toLowerCase().trim() === normalizedAnswer
      );
    }
    return false;
  };

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div style={{ padding: "2rem" }}>
        <div className="alert alert-danger">
          <h4>Error</h4>
          <p>Quiz not found</p>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div style={{ padding: "2rem" }}>
        <div className="alert alert-info">
          <h4>No Questions Available</h4>
          <p>This quiz has no questions yet.</p>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
          >
            Go Back to Edit
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (showResults) {
    const score = calculateScore();
    return (
      <div className={styles.container}>
        <div className={styles.quizContainer}>
          <h1 className={styles.quizTitle}>Preview Results</h1>
          <div className={styles.scoreContainer}>
            Score: {score} / {quiz.points}
          </div>

          <div className={styles.questionsList}>
            {quiz.questions.map((question, index) => {
              const correct = isAnswerCorrect(question);
              return (
                <div
                  key={question._id}
                  className={`${styles.questionItem} ${
                    correct ? styles.questionItemCorrect : styles.questionItemIncorrect
                  }`}
                >
                  <div className={styles.questionHeader}>
                    <span className={styles.questionNumber}>Question {index + 1}</span>
                    <span className={correct ? styles.correctBadge : styles.incorrectBadge}>
                      {correct ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                    <span className={styles.questionPoints}>
                      ({question.points} pts)
                    </span>
                  </div>
                  <p className={styles.questionText}>{question.question}</p>
                  <p className={styles.answerText}>
                    <strong>Your answer:</strong> {answers[question._id!] || "Not answered"}
                  </p>
                  <p className={styles.correctAnswerText}>
                    <strong>Correct answer:</strong>{" "}
                    {question.type === "MULTIPLE_CHOICE" && question.choices && question.correctChoice !== undefined
                      ? question.choices[question.correctChoice]
                      : question.type === "TRUE_FALSE" && question.correctAnswer !== undefined
                      ? (question.correctAnswer ? "True" : "False")
                      : question.possibleAnswers?.join(", ") || "N/A"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <button
              onClick={() => {
                setShowResults(false);
                setAnswers({});
                setCurrentQuestionIndex(0);
              }}
              className={`${styles.button} ${styles.buttonBlue}`}
            >
              Retake Preview
            </button>
            <button
              onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
              className={`${styles.button} ${styles.buttonGray}`}
            >
              Edit Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        {/* Quiz Title */}
        <h1 className={styles.quizTitle}>{quiz.title}</h1>

        {/* Started time */}
        <div className={styles.startedInfo}>
          Started: {formatDateTime(startTime)}
        </div>

        {/* Quiz Instructions */}
        <div className={styles.instructionsSection}>
          <h2 className={styles.instructionsHeading}>Quiz Instructions</h2>
          <hr className={styles.divider} />
          <p className={styles.instructionsText}>
            {quiz.description || "Please answer all questions and submit when done."}
          </p>
        </div>

        {/* Question Card */}
        <div className={styles.questionCard}>
          <div className={styles.questionHeader}>
            <span className={styles.questionLabel}>Question {currentQuestionIndex + 1}</span>
            <span className={styles.questionPoints}>{currentQuestion.points} pts</span>
          </div>
          
          <QuestionView
            question={currentQuestion}
            answer={answers[currentQuestion._id!]}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        {/* Navigation and Submit Section */}
        <div className={styles.navigationSection}>
          <div className={styles.navigationButtons}>
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className={styles.prevButton}
            >
              Previous
            </button>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className={styles.nextButton}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={styles.submitButton}
              >
                Submit Quiz
              </button>
            )}
          </div>

          <div className={styles.saveInfo}>
            <span className={styles.saveText}>
              Quiz saved at {formatDateTime(lastSaved)}
            </span>
            {currentQuestionIndex === quiz.questions.length - 1 && (
              <button
                onClick={handleSubmit}
                className={styles.submitButtonBottom}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        {}
        <div className={styles.editLink}>
          <span className={styles.editIcon}>✎</span>
          <button
            onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
            className={styles.editButton}
          >
            Keep Editing This Quiz
          </button>
        </div>

        {/* Questions List */}
        <div className={styles.questionsListSection}>
          <h3 className={styles.questionsListHeading}>Questions</h3>
          <div className={styles.questionsList}>
            {quiz.questions.map((q, index) => (
              <button
                key={q._id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`${styles.questionListItem} ${
                  index === currentQuestionIndex ? styles.questionListItemActive : ""
                }`}
              >
                {index === currentQuestionIndex ? (
                  <span className={styles.questionNumberActive}>Question {index + 1}</span>
                ) : (
                  <>
                    <span className={styles.questionIcon}>?</span>
                    <span>Question {index + 1}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Question View Component
interface QuestionViewProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: string, answer: string) => void;
}

function QuestionView({ question, answer, onAnswerChange }: QuestionViewProps) {
  return (
    <div className={styles.questionView}>
      <p className={styles.questionText}>{question.question}</p>

      {question.type === "MULTIPLE_CHOICE" && question.choices && (
        <div className={styles.choicesList}>
          {question.choices.map((choice, index) => (
            <label key={index} className={styles.choiceLabel}>
              <input
                type="radio"
                name={question._id}
                value={choice}
                checked={answer === choice}
                onChange={(e) => onAnswerChange(question._id!, e.target.value)}
                className={styles.radioInput}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "TRUE_FALSE" && (
        <div className={styles.choicesList}>
          <label className={styles.choiceLabel}>
            <input
              type="radio"
              name={question._id}
              value="true"
              checked={answer === "true"}
              onChange={(e) => onAnswerChange(question._id!, e.target.value)}
              className={styles.radioInput}
            />
            <span>True</span>
          </label>
          <label className={styles.choiceLabel}>
            <input
              type="radio"
              name={question._id}
              value="false"
              checked={answer === "false"}
              onChange={(e) => onAnswerChange(question._id!, e.target.value)}
              className={styles.radioInput}
            />
            <span>False</span>
          </label>
        </div>
      )}

      {question.type === "FILL_IN_BLANK" && (
        <input
          type="text"
          value={answer || ""}
          onChange={(e) => onAnswerChange(question._id!, e.target.value)}
          className={styles.textInput}
          placeholder="Type your answer here..."
        />
      )}
    </div>
  );
}
