"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { findQuizById, publishQuiz, unpublishQuiz } from "../client";
import { Quiz } from "../../../../Database/types";
import { KambazState } from "../../../../store/types";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: KambazState) => state.accountReducer);

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

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isStudent = currentUser?.role === "STUDENT";

  const handlePublish = async () => {
    if (!quiz) return;
    try {
      if (quiz.published) {
        await unpublishQuiz(qid as string);
        setQuiz({ ...quiz, published: false });
      } else {
        await publishQuiz(qid as string);
        setQuiz({ ...quiz, published: true });
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
      alert("Failed to update quiz publish status");
    }
  };

 
  useEffect(() => {
    if (currentUser) {
      console.log("[QuizDetails] Current user:", currentUser);
      console.log("[QuizDetails] Is student:", isStudent);
      console.log("[QuizDetails] Is faculty:", isFaculty);
    }
  }, [currentUser, isStudent, isFaculty]);

 
  const isQuizAvailable = () => {
    if (!quiz) return false;
    if (!quiz.published) return false;
    
    const now = new Date();
    if (quiz.availableDate) {
      const availableDate = new Date(quiz.availableDate);
      if (now < availableDate) return false;
    }
    if (quiz.availableUntilDate) {
      const untilDate = new Date(quiz.availableUntilDate);
      if (now > untilDate) return false;
    }
    return true;
  };

  if (loading) {
    return <div className="p-4">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <div className="d-flex gap-2">
          {isFaculty && (
            <>
              <Button
                variant={quiz.published ? "warning" : "success"}
                onClick={handlePublish}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`)
                }
              >
                Preview
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)
                }
              >
                Edit
              </Button>
            </>
          )}
          {isStudent && (
            <Button
              variant="danger"
              size="lg"
              onClick={() =>
                router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)
              }
              disabled={!isQuizAvailable()}
            >
              Start Quiz
            </Button>
          )}
          {isStudent && !isQuizAvailable() && (
            <div className="alert alert-warning ms-2 mb-0">
              {!quiz.published
                ? "This quiz is not yet published."
                : quiz.availableDate && new Date(quiz.availableDate) > new Date()
                ? `Quiz will be available on ${new Date(quiz.availableDate).toLocaleDateString()}`
                : quiz.availableUntilDate && new Date(quiz.availableUntilDate) < new Date()
                ? "This quiz is no longer available."
                : "Quiz is not available at this time."}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Quiz Instructions</h2>
          <p className="text-gray-700">{quiz.description || "No description provided."}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">Quiz Type</p>
            <p className="font-semibold">{quiz.quizType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Points</p>
            <p className="font-semibold">{quiz.points}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Assignment Group</p>
            <p className="font-semibold">{quiz.assignmentGroup}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Shuffle Answers</p>
            <p className="font-semibold">{quiz.shuffleAnswers ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time Limit</p>
            <p className="font-semibold">{quiz.timeLimit} Minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Multiple Attempts</p>
            <p className="font-semibold">
              {quiz.multipleAttempts ? `Yes (${quiz.attemptsAllowed})` : "No"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Show Correct Answers</p>
            <p className="font-semibold">{quiz.showCorrectAnswers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">One Question at a Time</p>
            <p className="font-semibold">{quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
          </div>
        </div>

        {quiz.dueDate && (
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="font-semibold">{new Date(quiz.dueDate).toLocaleString()}</p>
          </div>
        )}

        {quiz.availableDate && (
          <div>
            <p className="text-sm text-gray-600">Available From</p>
            <p className="font-semibold">{new Date(quiz.availableDate).toLocaleString()}</p>
          </div>
        )}

        {quiz.availableUntilDate && (
          <div>
            <p className="text-sm text-gray-600">Until</p>
            <p className="font-semibold">{new Date(quiz.availableUntilDate).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}