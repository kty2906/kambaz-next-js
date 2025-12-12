"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  findQuizById,
  updateQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../client";
import { Quiz, Question } from "../../../../../Database/types";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const fetchQuiz = async () => {
    try {
      console.log("[QuizEditor] Fetching quiz:", qid);
      const data = await findQuizById(qid as string);
      console.log("[QuizEditor] Quiz fetched:", data?._id);
      setQuiz(data);
    } catch (error) {
      console.error("[QuizEditor] Error fetching quiz:", error);
      alert("Error loading quiz. Redirecting to quiz list.");
      router.push(`/Kambaz/Courses/${cid}/Quizzes`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuiz = async (updates?: Partial<Quiz>) => {
    try {
      if (!quiz) return;
      
      const dataToSave = updates || quiz;
      
      console.log("[QuizEditor] Saving quiz:", dataToSave);
      const updated = await updateQuiz(qid as string, dataToSave);
      console.log("[QuizEditor] Quiz saved:", updated);
      setQuiz(updated);
      return updated;
    } catch (error) {
      console.error("[QuizEditor] Error updating quiz:", error);
      alert("Error saving quiz. Please try again.");
      throw error;
    }
  };

  const handleSave = async () => {
    if (!quiz) return;
    try {
      await handleUpdateQuiz(quiz);
      alert("Quiz saved successfully!");
    } catch (error) {
      // Error 
    }
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    try {
      await handleUpdateQuiz({ ...quiz, published: true });
      alert("Quiz saved and published!");
      router.push(`/Kambaz/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("[QuizEditor] Error in save and publish:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleAddQuestion = async (question: Partial<Question>) => {
    try {
      const updated = await addQuestion(qid as string, question);
      setQuiz(updated);
      setIsAddingQuestion(false);
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Error adding question. Please try again.");
    }
  };

  const handleUpdateQuestion = async (questionId: string, questionData: Partial<Question>) => {
    try {
      const updated = await updateQuestion(qid as string, questionId, questionData);
      setQuiz(updated);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    
    try {
      const updated = await deleteQuestion(qid as string, questionId);
      setQuiz(updated);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading quiz...</p>
        <p className="text-sm text-gray-500 mt-2">Quiz ID: {qid as string}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-4">
        <p>Quiz not found</p>
        <button
          onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes`)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Quiz</h1>
        <div className="space-x-2">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleSaveAndPublish}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save & Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "details"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "questions"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </div>
      </div>

      {/* Details Tab */}
      {activeTab === "details" && (
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              value={quiz.title || ""}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={quiz.description || ""}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Quiz Type</label>
              <select
                value={quiz.quizType || "GRADED_QUIZ"}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value as Quiz["quizType"] })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Assignment Group</label>
              <select
                value={quiz.assignmentGroup || "QUIZZES"}
                onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value as Quiz["assignmentGroup"] })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                value={quiz.timeLimit || 20}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 20 })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Points</label>
              <input
                type="number"
                value={quiz.points || 0}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
                title="Points are automatically calculated from questions"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={quiz.shuffleAnswers || false}
                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-semibold">Shuffle Answers</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={quiz.multipleAttempts || false}
                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-semibold">Multiple Attempts</span>
            </label>

            {quiz.multipleAttempts && (
              <div className="ml-6">
                <label className="block text-sm font-semibold mb-2">How Many Attempts</label>
                <input
                  type="number"
                  value={quiz.attemptsAllowed || 1}
                  onChange={(e) => setQuiz({ ...quiz, attemptsAllowed: parseInt(e.target.value) || 1 })}
                  className="border rounded px-3 py-2"
                  min="1"
                />
              </div>
            )}

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={quiz.oneQuestionAtATime || false}
                onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-semibold">One Question at a Time</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={quiz.webcamRequired || false}
                onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-semibold">Webcam Required</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={quiz.lockQuestionsAfterAnswering || false}
                onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-semibold">Lock Questions After Answering</span>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Due Date</label>
              <input
                type="datetime-local"
                value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value || "" })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Available From</label>
              <input
                type="datetime-local"
                value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""}
                onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value || "" })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Until</label>
              <input
                type="datetime-local"
                value={quiz.availableUntilDate ? new Date(quiz.availableUntilDate).toISOString().slice(0, 16) : ""}
                onChange={(e) => setQuiz({ ...quiz, availableUntilDate: e.target.value || "" })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Access Code</label>
            <input
              type="text"
              value={quiz.accessCode || ""}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Optional"
            />
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Questions (Total Points: {quiz.points || 0})
            </h2>
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              + New Question
            </button>
          </div>

          {quiz.questions?.length === 0 && !isAddingQuestion && (
            <div className="text-center text-gray-500 py-8">
              No questions yet. Click &quot;+ New Question&quot; to add one.
            </div>
          )}

          {quiz.questions?.map((question: Question, index: number) => (
            <QuestionCard
              key={question._id}
              question={question}
              index={index}
              isEditing={editingQuestion?._id === question._id}
              onEdit={() => setEditingQuestion(question)}
              onSave={(data) => handleUpdateQuestion(question._id!, data)}
              onCancel={() => setEditingQuestion(null)}
              onDelete={() => handleDeleteQuestion(question._id!)}
            />
          ))}

          {isAddingQuestion && (
            <QuestionEditor
              onSave={handleAddQuestion}
              onCancel={() => setIsAddingQuestion(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Question Card Component
interface QuestionCardProps {
  question: Question;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Partial<Question>) => void;
  onCancel: () => void;
  onDelete: () => void;
}

function QuestionCard({ question, index, isEditing, onEdit, onSave, onCancel, onDelete }: QuestionCardProps) {
  const [editData, setEditData] = useState(question);

  if (isEditing) {
    return (
      <QuestionEditor
        question={editData}
        onSave={onSave}
        onCancel={onCancel}
        onChange={setEditData}
      />
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Question {index + 1}</span>
            <span className="text-sm text-gray-600">({question.type})</span>
            <span className="text-sm font-semibold text-blue-600">{question.points} pts</span>
          </div>
          <p className="text-gray-800 mb-2">{question.question}</p>
          
          {question.type === "MULTIPLE_CHOICE" && question.choices && question.correctChoice !== undefined && (
            <div className="space-y-1">
              {question.choices.map((choice, i) => {
                const isCorrect = i === question.correctChoice;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className={isCorrect ? "text-green-600" : ""}>
                      {isCorrect ? "✓" : "○"}
                    </span>
                    <span className={isCorrect ? "font-semibold" : ""}>
                      {choice}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {question.type === "TRUE_FALSE" && question.correctAnswer !== undefined && (
            <p className="font-semibold text-green-600">
              Correct Answer: {question.correctAnswer ? "True" : "False"}
            </p>
          )}

          {question.type === "FILL_IN_BLANK" && question.possibleAnswers && (
            <p className="font-semibold text-green-600">
              Correct Answers: {question.possibleAnswers.join(", ")}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Question Editor Component
interface QuestionEditorProps {
  question?: Question;
  onSave: (data: Partial<Question>) => void;
  onCancel: () => void;
  onChange?: (data: Question) => void;
}

function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [formData, setFormData] = useState<Partial<Question>>(
    question || {
      type: "MULTIPLE_CHOICE",
      title: "",
      points: 1,
      question: "",
      choices: ["", "", "", ""],
      correctChoice: 0,
    }
  );

  const handleSubmit = () => {
    if (!formData.question?.trim()) {
      alert("Please enter a question");
      return;
    }

    if (formData.type === "MULTIPLE_CHOICE" && (formData.correctChoice === undefined || !formData.choices || formData.choices.length === 0)) {
      alert("Please select a correct answer");
      return;
    }

    if (formData.type === "TRUE_FALSE" && formData.correctAnswer === undefined) {
      alert("Please select true or false");
      return;
    }

    if (formData.type === "FILL_IN_BLANK" && (!formData.possibleAnswers || formData.possibleAnswers.length === 0)) {
      alert("Please provide at least one correct answer");
      return;
    }

    const questionData: Partial<Question> = {
      type: formData.type!,
      title: formData.title || formData.question?.substring(0, 50) || "New Question",
      question: formData.question!,
      points: formData.points || 1,
    };

    if (formData.type === "MULTIPLE_CHOICE") {
      questionData.choices = formData.choices?.filter(c => c.trim() !== "");
      questionData.correctChoice = formData.correctChoice;
    } else if (formData.type === "TRUE_FALSE") {
      questionData.correctAnswer = formData.correctAnswer;
    } else if (formData.type === "FILL_IN_BLANK") {
      questionData.possibleAnswers = formData.possibleAnswers?.filter(a => a.trim() !== "");
    }

    onSave(questionData);
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...(formData.choices || [])];
    newChoices[index] = value;
    setFormData({ ...formData, choices: newChoices });
  };

  const addChoice = () => {
    setFormData({ ...formData, choices: [...(formData.choices || []), ""] });
  };

  const removeChoice = (index: number) => {
    const newChoices = (formData.choices || []).filter((_, i) => i !== index);
    setFormData({ ...formData, choices: newChoices });
  };

  const handleCorrectAnswerToggle = (index: number) => {
    if (formData.type === "MULTIPLE_CHOICE") {
      setFormData({ ...formData, correctChoice: index });
    }
  };

  const addBlankAnswer = () => {
    setFormData({
      ...formData,
      possibleAnswers: [...(formData.possibleAnswers || []), ""],
    });
  };

  const updateBlankAnswer = (index: number, value: string) => {
    const newAnswers = [...(formData.possibleAnswers || [])];
    newAnswers[index] = value;
    setFormData({ ...formData, possibleAnswers: newAnswers });
  };

  const removeBlankAnswer = (index: number) => {
    const newAnswers = (formData.possibleAnswers || []).filter((_, i) => i !== index);
    setFormData({ ...formData, possibleAnswers: newAnswers });
  };

  return (
    <div className="border rounded-lg p-6 bg-white space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Question Type</label>
          <select
            value={formData.type || "MULTIPLE_CHOICE"}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as Question["type"],
                choices: e.target.value === "MULTIPLE_CHOICE" ? ["", "", "", ""] : undefined,
                correctChoice: e.target.value === "MULTIPLE_CHOICE" ? 0 : undefined,
                correctAnswer: undefined,
                possibleAnswers: e.target.value === "FILL_IN_BLANK" ? [""] : undefined,
              })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_BLANK">Fill in the Blank</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Points</label>
          <input
            type="number"
            value={formData.points || 1}
            onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 1 })}
            className="w-full border rounded px-3 py-2"
            min="1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Question</label>
        <textarea
          value={formData.question || ""}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="w-full border rounded px-3 py-2"
          rows={3}
          placeholder="Enter your question here..."
        />
      </div>

      {/* Multiple Choice */}
      {formData.type === "MULTIPLE_CHOICE" && (
        <div>
          <label className="block text-sm font-semibold mb-2">Choices</label>
          <div className="space-y-2">
            {(formData.choices || []).map((choice, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctChoice === index}
                  onChange={() => handleCorrectAnswerToggle(index)}
                  className="mt-1"
                />
                <input
                  type="text"
                  value={choice || ""}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder={`Choice ${index + 1}`}
                />
                {(formData.choices?.length || 0) > 2 && (
                  <button
                    onClick={() => removeChoice(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addChoice}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Another Choice
          </button>
        </div>
      )}

      {/* True/False */}
      {formData.type === "TRUE_FALSE" && (
        <div>
          <label className="block text-sm font-semibold mb-2">Correct Answer</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trueFalse"
                checked={formData.correctAnswer === true}
                onChange={() => setFormData({ ...formData, correctAnswer: true })}
              />
              <span>True</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trueFalse"
                checked={formData.correctAnswer === false}
                onChange={() => setFormData({ ...formData, correctAnswer: false })}
              />
              <span>False</span>
            </label>
          </div>
        </div>
      )}

      {/* Fill in the Blank */}
      {formData.type === "FILL_IN_BLANK" && (
        <div>
          <label className="block text-sm font-semibold mb-2">
            Possible Correct Answers (case-insensitive)
          </label>
          <div className="space-y-2">
            {(formData.possibleAnswers || []).map((answer, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={answer || ""}
                  onChange={(e) => updateBlankAnswer(index, e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder={`Answer ${index + 1}`}
                />
                <button
                  onClick={() => removeBlankAnswer(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addBlankAnswer}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Another Answer
          </button>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {question ? "Update Question" : "Add Question"}
        </button>
      </div>
    </div>
  );
}