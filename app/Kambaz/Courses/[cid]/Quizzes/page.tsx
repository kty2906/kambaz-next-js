"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaEllipsisV, FaBan, FaCheckCircle } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Quiz } from "../../../Database/types";
import { KambazState } from "../../../store/types";

export default function QuizzesList() {
  const { cid } = useParams();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: KambazState) => state.accountReducer);

  const fetchQuizzes = async () => {
    if (!cid || Array.isArray(cid)) return;
    try {
      const data = await quizzesClient.findQuizzesForCourse(cid as string);
    
      const sorted = [...data].sort((a, b) => {
        const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
        const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
        if (dateB !== dateA) {
          return dateB - dateA; // Most recent first
        }
       
        return (a.title || "").localeCompare(b.title || "");
      });
      setQuizzes(sorted);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const handleAddQuiz = async () => {
    if (!cid || Array.isArray(cid)) return;
    try {
      console.log("[Quizzes] Creating new quiz for course:", cid);
      const newQuiz = await quizzesClient.createQuiz(cid as string, {
        title: "New Quiz",
        description: "",
        quizType: "GRADED_QUIZ",
        points: 0,
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        attemptsAllowed: 1,
        showCorrectAnswers: "IMMEDIATELY",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        published: false,
        questions: [],
      });
      console.log("[Quizzes] Quiz created successfully:", newQuiz?._id, "Full response:", newQuiz);
      if (newQuiz && newQuiz._id) {
        console.log("[Quizzes] Navigating to edit page:", `/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
        // Use window.location for more reliable navigation
        window.location.href = `/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}/edit`;
      } else {
        console.error("[Quizzes] Invalid quiz response:", newQuiz);
        alert("Failed to create quiz: Invalid response from server");
      }
    } catch (error: unknown) {
      console.error("[Quizzes] Error creating quiz:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create quiz";
      alert(`Failed to create quiz: ${errorMessage}`);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await quizzesClient.deleteQuiz(quizId);
      setQuizzes(quizzes.filter((q) => q._id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("Failed to delete quiz");
    }
  };

  const handlePublish = async (quizId: string) => {
    try {
      await quizzesClient.publishQuiz(quizId);
      setQuizzes(quizzes.map((q) => (q._id === quizId ? { ...q, published: true } : q)));
    } catch (error) {
      console.error("Error publishing quiz:", error);
      alert("Failed to publish quiz");
    }
  };

  const handleUnpublish = async (quizId: string) => {
    try {
      await quizzesClient.unpublishQuiz(quizId);
      setQuizzes(quizzes.map((q) => (q._id === quizId ? { ...q, published: false } : q)));
    } catch (error) {
      console.error("Error unpublishing quiz:", error);
      alert("Failed to unpublish quiz");
    }
  };

  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return "";
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return "";
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes === 0 ? "" : `:${minutes.toString().padStart(2, "0")}`;
    return `${month} ${day} at ${displayHours}${displayMinutes}${ampm}`;
  };

  const getAvailabilityStatus = (quiz: Quiz): string => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const availableUntilDate = quiz.availableUntilDate ? new Date(quiz.availableUntilDate) : null;

    if (availableUntilDate && now > availableUntilDate) {
      return "Closed";
    }
    if (availableDate && availableUntilDate && now >= availableDate && now <= availableUntilDate) {
      return "Available";
    }
    if (availableDate && now < availableDate) {
      return `Not available until ${formatDate(quiz.availableDate)}`;
    }
    if (availableDate && now >= availableDate) {
      return "Available";
    }
    return "Available";
  };

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  if (loading) {
    return <div className="p-4">Loading quizzes...</div>;
  }

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search for Quiz"
          id="wd-search-quiz"
        />
        {isFaculty && (
          <div>
            <Button variant="danger" onClick={handleAddQuiz} id="wd-add-quiz">
              <FaPlus className="me-2" />
              Quiz
            </Button>
          </div>
        )}
      </div>

      <h3 className="text-danger">Assignment Quizzes</h3>

      {quizzes.length === 0 ? (
        <div className="alert alert-info">
          {isFaculty
            ? "No quizzes available. Click + Quiz to add a new quiz."
            : "No quizzes available."}
        </div>
      ) : (
        <ul className="list-group">
          {quizzes.map((quiz) => {
            const availability = getAvailabilityStatus(quiz);
            return (
              <li
                key={quiz._id}
                className="list-group-item"
                style={{ borderLeft: "4px solid #0cab5a" }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      {isFaculty && (
                        <button
                          className="btn btn-link p-0 border-0"
                          onClick={() => {
                            if (quiz.published) {
                              handleUnpublish(quiz._id!);
                            } else {
                              handlePublish(quiz._id!);
                            }
                          }}
                          title={quiz.published ? "Unpublish" : "Publish"}
                        >
                          {quiz.published ? (
                            <FaCheckCircle className="text-success" />
                          ) : (
                            <FaBan className="text-secondary" />
                          )}
                        </button>
                      )}
                      <a
                        href={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                        className="text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
                        }}
                      >
                        <strong className="text-danger fs-5">{quiz.title}</strong>
                      </a>
                    </div>
                    <div className="ms-4">
                      <small className="text-muted">
                        {availability}
                      </small>
                      {quiz.dueDate && (
                        <>
                          <br />
                          <small className="text-muted">
                            <strong>Due:</strong> {formatDate(quiz.dueDate as string)}
                          </small>
                        </>
                      )}
                      <br />
                      <small className="text-muted">
                        {quiz.points} pts, {quiz.questions?.length || 0} Questions
                      </small>
                    </div>
                  </div>

                  {isFaculty && (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        className="text-dark p-0"
                        id={`quiz-menu-${quiz._id}`}
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id!)}>
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            if (quiz.published) {
                              handleUnpublish(quiz._id!);
                            } else {
                              handlePublish(quiz._id!);
                            }
                          }}
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}