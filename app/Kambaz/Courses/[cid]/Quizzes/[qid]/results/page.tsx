"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { findQuizById, getUserAttempts, getLatestAttempt } from "../../client";
import { Quiz, QuizAttempt } from "../../../../../Database/types";
import { KambazState } from "../../../../../store/types";
import styles from "./page.module.css";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [allAttempts, setAllAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: KambazState) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      fetchResults(currentUser._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid, currentUser]);

  const fetchResults = async (userId: string) => {
    try {
      const [quizData, attemptData, attemptsData] = await Promise.all([
        findQuizById(qid as string),
        getLatestAttempt(qid as string, userId),
        getUserAttempts(qid as string, userId),
      ]);
      setQuiz(quizData);
      setAttempt(attemptData);
      setAllAttempts(attemptsData || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const calculateTimeSpent = (startedAt: string, submittedAt: string | null) => {
    if (!submittedAt) return "Not completed";
    const start = new Date(startedAt).getTime();
    const end = new Date(submittedAt).getTime();
    const minutes = Math.floor((end - start) / 60000);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  if (loading) {
    return <div className="p-4">Loading results...</div>;
  }

  if (!quiz || !attempt) {
    return (
      <div className="p-4">
        <p>No results found. You may not have taken this quiz yet.</p>
        <button
          onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Quiz
        </button>
      </div>
    );
  }

  const timeSpent = calculateTimeSpent(attempt.startedAt, attempt.submittedAt || null);
  
  // Check if correct answers should be shown
  const showCorrectAnswers = (() => {
    if (quiz.showCorrectAnswers === "NEVER") return false;
    if (quiz.showCorrectAnswers === "ALWAYS") return true;
    if (quiz.showCorrectAnswers === "IMMEDIATELY") return true;
    if (quiz.showCorrectAnswers === "AFTER_DUE_DATE") {
      if (!quiz.dueDate) return true; 
      const dueDate = new Date(quiz.dueDate);
      const now = new Date();
      return now >= dueDate; 
    }
    return false;
  })();

  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        {/* Attempt History Header */}
        <h1 className={styles.attemptHistoryHeading}>Attempt history</h1>

        {/* Attempt History Table */}
        <table className={styles.attemptTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}></th>
              <th className={styles.tableHeader}>Attempt</th>
              <th className={styles.tableHeader}>Time</th>
              <th className={styles.tableHeader}>Score</th>
            </tr>
          </thead>
          <tbody>
            {allAttempts.map((att, index) => (
              <tr key={att._id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  {index === 0 && <span className={styles.latestBadge}>LATEST</span>}
                </td>
                <td className={styles.tableCell}>
                  <button
                    onClick={() => {
                      setAttempt(att);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={styles.attemptLink}
                  >
                    Attempt {att.attemptNumber}
                  </button>
                </td>
                <td className={styles.tableCell}>
                  {calculateTimeSpent(att.startedAt, att.submittedAt || null)}
                </td>
                <td className={styles.tableCell}>
                  {att.score} out of {quiz.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {}
        {!showCorrectAnswers && (
          <div className={styles.warningBanner}>
            <span className={styles.warningIcon}>⚠</span>
            <span>Correct answers are no longer available.</span>
          </div>
        )}

        {}
        <div className={styles.scoreSummary}>
          <p className={styles.scoreText}>
            Score for this quiz: <strong>{attempt.score}</strong> out of {quiz.points}
          </p>
          {attempt.startedAt && (
            <p className={styles.submittedText}>
              Started: {formatDateTime(attempt.startedAt)}
            </p>
          )}
          {attempt.submittedAt && (
            <>
              <p className={styles.submittedText}>
                Submitted {formatDate(attempt.submittedAt)} at{" "}
                {new Date(attempt.submittedAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: false,
                }).replace(":", "")}
              </p>
              <p className={styles.timeText}>This attempt took {timeSpent}.</p>
            </>
          )}
        </div>

        {/* Question Review */}
        {showCorrectAnswers && (
          <div className={styles.questionReview}>
            {quiz.questions.map((question, index) => {
              const userAnswer = attempt.answers.find((a) => a.questionId === question._id);
              const isCorrect = userAnswer?.isCorrect || false;
              const pointsAwarded = userAnswer?.pointsAwarded || 0;

              return (
                <div 
                  key={question._id} 
                  className={`${styles.questionCard} ${
                    isCorrect ? styles.questionCardCorrect : styles.questionCardIncorrect
                  }`}
                >
                  <div className={styles.questionHeader}>
                    <div className={styles.questionHeaderLeft}>
                      <span className={styles.questionNumber}>Question {index + 1}</span>
                      {isCorrect ? (
                        <span className={styles.correctIndicator}>✓</span>
                      ) : (
                        <span className={styles.incorrectIndicator}>✗</span>
                      )}
                    </div>
                    <span className={styles.questionPoints}>
                      {pointsAwarded} / {question.points} pts
                    </span>
                  </div>

                  <p className={styles.questionText}>{question.question}</p>

                  {/* Answer Display */}
                  <div className={styles.answerSection}>
                    {question.type === "MULTIPLE_CHOICE" && question.choices && (
                      <div className={styles.choicesList}>
                        {question.choices.map((choice, i) => {
                          const isUserChoice = userAnswer?.answer === choice;
                          const isCorrectChoice = question.correctChoice !== undefined && i === question.correctChoice;
                          return (
                            <label
                              key={i}
                              className={`${styles.choiceLabel} ${
                                isUserChoice ? styles.choiceSelected : ""
                              }`}
                            >
                              <input
                                type="radio"
                                checked={isUserChoice}
                                disabled
                                className={styles.radioInput}
                              />
                              {showCorrectAnswers && isCorrectChoice && (
                                <span className={styles.correctIndicator}>✓</span>
                              )}
                              {showCorrectAnswers && isUserChoice && !isCorrectChoice && (
                                <span className={styles.incorrectIndicator}>✗</span>
                              )}
                              <span
                                className={
                                  showCorrectAnswers && isCorrectChoice
                                    ? styles.correctAnswer
                                    : showCorrectAnswers && isUserChoice && !isCorrectChoice
                                    ? styles.incorrectAnswer
                                    : ""
                                }
                              >
                                {choice}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {question.type === "TRUE_FALSE" && (
                      <div className={styles.choicesList}>
                        <label
                          className={`${styles.choiceLabel} ${
                            userAnswer?.answer === "true" ? styles.choiceSelected : ""
                          }`}
                        >
                          <input
                            type="radio"
                            checked={userAnswer?.answer === "true"}
                            disabled
                            className={styles.radioInput}
                          />
                          {showCorrectAnswers && question.correctAnswer === true && (
                            <span className={styles.correctIndicator}>✓</span>
                          )}
                          {showCorrectAnswers && userAnswer?.answer === "true" && question.correctAnswer === false && (
                            <span className={styles.incorrectIndicator}>✗</span>
                          )}
                          <span
                            className={
                              showCorrectAnswers && question.correctAnswer === true
                                ? styles.correctAnswer
                                : showCorrectAnswers && userAnswer?.answer === "true" && question.correctAnswer === false
                                ? styles.incorrectAnswer
                                : ""
                            }
                          >
                            True
                          </span>
                        </label>
                        <label
                          className={`${styles.choiceLabel} ${
                            userAnswer?.answer === "false" ? styles.choiceSelected : ""
                          }`}
                        >
                          <input
                            type="radio"
                            checked={userAnswer?.answer === "false"}
                            disabled
                            className={styles.radioInput}
                          />
                          {showCorrectAnswers && question.correctAnswer === false && (
                            <span className={styles.correctIndicator}>✓</span>
                          )}
                          {showCorrectAnswers && userAnswer?.answer === "false" && question.correctAnswer === true && (
                            <span className={styles.incorrectIndicator}>✗</span>
                          )}
                          <span
                            className={
                              showCorrectAnswers && question.correctAnswer === false
                                ? styles.correctAnswer
                                : showCorrectAnswers && userAnswer?.answer === "false" && question.correctAnswer === true
                                ? styles.incorrectAnswer
                                : ""
                            }
                          >
                            False
                          </span>
                        </label>
                      </div>
                    )}

                    {question.type === "FILL_IN_BLANK" && (
                      <div className={styles.fillInBlankAnswer}>
                        <p className={styles.answerLabel}>Your answer:</p>
                        <p className={isCorrect ? styles.correctAnswer : styles.incorrectAnswer}>
                          {userAnswer?.answer?.toString() || "Not answered"}
                        </p>
                        {showCorrectAnswers && (
                          <>
                            <p className={styles.answerLabel}>Correct answer:</p>
                            <p className={styles.correctAnswer}>
                              {question.possibleAnswers?.join(", ") || "N/A"}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
