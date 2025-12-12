"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { findQuizById, submitQuizAttempt, getUserAttempts } from "../../client";
import { Quiz, Question, QuizAnswer } from "../../../../../Database/types";
import { KambazState } from "../../../../../store/types";
import styles from "./page.module.css";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [startTime] = useState<Date>(new Date());
  const { currentUser } = useSelector((state: KambazState) => state.accountReducer);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  useEffect(() => {
    if (currentUser) {
      fetchQuizAndAttempts(currentUser._id);
    } else {
      setLoading(false);
      setError("Please log in to take the quiz");
    }
  }, [qid, currentUser]);

  useEffect(() => {
    if (quiz && timeRemaining === null) {
      setTimeRemaining(quiz.timeLimit * 60); 
    }
  }, [quiz]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining]);

 
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      setLastSaved(new Date());
    }, 30000);
    return () => clearInterval(autoSaveInterval);
  }, []);

  const fetchQuizAndAttempts = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log("[TakeQuiz] Fetching quiz:", qid);
      
      const [quizData, attemptsData] = await Promise.all([
        findQuizById(qid as string),
        getUserAttempts(qid as string, userId),
      ]);
      
      console.log("[TakeQuiz] Quiz data received:", quizData);
      console.log("[TakeQuiz] Quiz questions:", quizData.questions?.length || 0);
      
      if (!quizData) {
        setError("Quiz not found");
        setLoading(false);
        return;
      }

      if (!quizData.questions || quizData.questions.length === 0) {
        setError("This quiz has no questions yet. Please contact your instructor.");
        setLoading(false);
        return;
      }

      setQuiz(quizData);
      setAttempts(attemptsData);

     
      if (!quizData.multipleAttempts && attemptsData.length > 0) {
        alert("You have already taken this quiz. Multiple attempts are not allowed.");
        router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results`);
        return;
      }

      if (quizData.multipleAttempts && attemptsData.length >= quizData.attemptsAllowed) {
        alert("You have reached the maximum number of attempts for this quiz.");
        router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results`);
        return;
      }
    } catch (error: any) {
      console.error("[TakeQuiz] Error fetching quiz:", error);
      setError(error.response?.data?.message || error.message || "Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    setLastSaved(new Date());
  };

  const handleSubmit = async () => {
    if (submitting || !currentUser || !quiz) return;
    setSubmitting(true);

    try {
      const answersArray: QuizAnswer[] = quiz.questions.map((q) => ({
        questionId: q._id!,
        answer: answers[q._id!] || "",
      }));

      await submitQuizAttempt(qid as string, currentUser._id, answersArray, startTime);
      router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz. Please try again.");
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

  if (error) {
    return (
      <div style={{ padding: "2rem" }}>
        <div className="alert alert-danger">
          <h4>Error</h4>
          <p>{error}</p>
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

  if (!quiz || !currentUser) {
    return (
      <div style={{ padding: "2rem" }}>
        <div className="alert alert-warning">
          <p>Quiz not found or you are not logged in.</p>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes`)}
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
          <p>This quiz has no questions yet. Please contact your instructor.</p>
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

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

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
                disabled={submitting}
                className={styles.submitButton}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
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
                disabled={submitting}
                className={styles.submitButtonBottom}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            )}
          </div>
        </div>

        {/* Keep Editing Link (for faculty) */}
        {isFaculty && (
          <div className={styles.editLink}>
            <span className={styles.editIcon}>✎</span>
            <button
              onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
              className={styles.editButton}
            >
              Keep Editing This Quiz
            </button>
          </div>
        )}

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

      {question.type === "MULTIPLE_CHOICE" && (
        <div className={styles.choicesList}>
          {question.choices?.map((choice, index) => (
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
