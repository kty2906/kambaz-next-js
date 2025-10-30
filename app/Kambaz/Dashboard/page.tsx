"use client"
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFileImport } from "react-icons/fa";
import './dashboard.css';
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "./reducer";
import { useState } from "react";
import { Button, FormControl, Row, Col, Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import { Course } from "../Database/types";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "New Department",
    credits: 4,
    description: "New Description"
  });

  const courseColors: { [key: string]: string } = {
    "1234": "#4CAF50",
    "2001": "#4CAF50",
    "3002": "#1976D2",
    "4003": "#2196F3"
  };

  const handleAddCourse = () => {
    dispatch(addCourse(course));
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      department: "New Department",
      credits: 4,
      description: "New Description"
    });
  };

  const handleDeleteCourse = (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(deleteCourse(courseId));
  };

  const handleEditCourse = (courseToEdit: Course, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCourse(courseToEdit);
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  return (
    <div id="wd-dashboard" style={{ marginLeft: '120px' }}>
      <div className="container-fluid p-4">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>
        <hr />
        
        {/* NEW COURSE FORM */}
        <div className="mb-4">
          <h5>
            New Course
            <Button 
              variant="primary" 
              className="float-end"
              onClick={handleAddCourse}
              id="wd-add-new-course-click"
            >
              Add
            </Button>
            <Button 
              variant="warning" 
              className="float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </h5>
          <br /><br />
          <FormControl 
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <FormControl 
            value={course.number}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
            placeholder="Course Number"
          />
          <FormControl 
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="Course Description"
          />
        </div>
        <hr />
        
        <h2 id="wd-dashboard-published" className="fs-5 mb-4">
          Published Courses ({courses.length})
        </h2>

        <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {courses.map((c: Course) => (
            <div key={c._id} className="col">
              <div className="card wd-dashboard-course h-100">
                <Link 
                  href={`/Kambaz/Courses/${c._id}/Home`} 
                  className="text-decoration-none"
                >
                  <div 
                    className="card-img-top position-relative" 
                    style={{ 
                      backgroundColor: courseColors[c._id] || "#4CAF50",
                      height: '150px',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="position-absolute top-0 end-0 p-2">
                      <button 
                        className="btn btn-link text-white p-0"
                        style={{ fontSize: '20px' }}
                      >
                        <BsThreeDotsVertical />
                      </button>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <h5 className="card-title text-danger mb-2" style={{ fontSize: '14px' }}>
                      {c.name}
                    </h5>
                    <p className="card-text text-dark mb-1" style={{ fontSize: '13px' }}>
                      {c.number}
                    </p>
                    <p className="card-text text-muted" style={{ fontSize: '12px' }}>
                      {c.description}
                    </p>
                    
                    {/* CRUD BUTTONS */}
                    <div className="d-flex gap-2 mt-2">
                      <Button 
                        variant="warning" 
                        size="sm"
                        onClick={(e) => handleEditCourse(c, e)}
                        id="wd-edit-course-click"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={(e) => handleDeleteCourse(c._id, e)}
                        id="wd-delete-course-click"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Link>
                
                <div className="card-footer bg-white border-0 d-flex justify-content-start align-items-center pb-3">
                  <FaFileImport className="text-muted" style={{ fontSize: '16px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}