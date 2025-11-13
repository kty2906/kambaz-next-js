"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as userClient from "../Account/client";
import * as courseClient from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Fetch enrolled courses
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      setAllCourses(allCourses);
    } catch (error) {
      console.error(error);
    }
  };

  // Enroll in course
  const enrollInCourse = async (courseId: string) => {
    try {
      await enrollmentsClient.enrollInCourse("current", courseId);
      // Refresh enrolled courses
      await fetchCourses();
      alert("Successfully enrolled!");
    } catch (error) {
      console.error(error);
      alert("Failed to enroll in course");
    }
  };

  // Unenroll from course
  const unenrollFromCourse = async (courseId: string) => {
    try {
      await enrollmentsClient.unenrollFromCourse("current", courseId);
      // Refresh enrolled courses
      await fetchCourses();
      alert("Successfully unenrolled!");
    } catch (error) {
      console.error(error);
      alert("Failed to unenroll from course");
    }
  };

  // Check if enrolled
  const isEnrolled = (courseId: string) => {
    return courses.some((c) => c._id === courseId);
  };

  // Add new course
  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
      setCourse({
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create course");
    }
  };

  // Delete course
  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete course");
    }
  };

  // Update course
  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) return course;
          return c;
        })
      );
      alert("Course updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update course");
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchAllCourses();
    }
  }, [currentUser]);

  // Toggle between enrolled and all courses
  const displayCourses = showAllCourses ? allCourses : courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      {/* Course Form */}
      <h5>New Course</h5>
      <div className="mb-3">
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          placeholder="Course Name"
        />
        <input
          value={course.number}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, number: e.target.value })}
          placeholder="Course Number"
        />
        <input
          value={course.startDate}
          className="form-control mb-2"
          type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
        />
        <input
          value={course.endDate}
          className="form-control mb-2"
          type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          placeholder="Course Description"
          rows={3}
        />
        <button className="btn btn-primary me-2" onClick={addNewCourse}>
          Add Course
        </button>
        <button className="btn btn-warning" onClick={updateCourse}>
          Update Course
        </button>
      </div>
      
      <hr />

      {/* Toggle Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          {showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayCourses.length})
        </h2>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "Show All Courses"}
        </button>
      </div>
      
      <hr />
      
      {/* Courses Grid */}
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {displayCourses.map((c) => (
          <div key={c._id} className="col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <img
                src="/images/reactjs.jpg"
                className="card-img-top"
                style={{ height: "160px", objectFit: "cover" }}
              />
              <div className="card-body">
                <a
                  href={`/Kambaz/Courses/${c._id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <h5 className="card-title">{c.name}</h5>
                </a>
                <p className="card-text">{c.number}</p>
                <p className="card-text text-muted small">
                  {c.startDate} to {c.endDate}
                </p>
                
                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <a
                    href={`/Kambaz/Courses/${c._id}/Home`}
                    className="btn btn-primary btn-sm"
                  >
                    Go to Course
                  </a>
                  
                  {isEnrolled(c._id) ? (
                    <>
                      <button
                        onClick={() => deleteCourse(c._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setCourse(c)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => unenrollFromCourse(c._id)}
                        className="btn btn-secondary btn-sm"
                      >
                        Unenroll
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => enrollInCourse(c._id)}
                      className="btn btn-success btn-sm"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}