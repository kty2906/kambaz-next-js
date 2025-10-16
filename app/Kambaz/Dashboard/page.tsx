import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFileImport } from "react-icons/fa";
import './dashboard.css';
import * as db from "../Database";

export default function Dashboard() {
  // Get courses from database
  const courses = db.courses;

  // Map course IDs to colors (keeping your original colors)
  const courseColors: { [key: string]: string } = {
    "1234": "#4CAF50",
    "2001": "#4CAF50",
    "3002": "#1976D2",
    "4003": "#2196F3"
  };

  return (
    <div id="wd-dashboard" style={{ marginLeft: '120px' }}>
      <div className="container-fluid p-4">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>
        <hr />
        
        <h2 id="wd-dashboard-published" className="fs-5 mb-4">
          Published Courses ({courses.length})
        </h2>

        <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col">
              <div className="card wd-dashboard-course h-100">
                <Link 
                  href={`/Kambaz/Courses/${course._id}/Home`} 
                  className="text-decoration-none"
                >
                  <div 
                    className="card-img-top position-relative" 
                    style={{ 
                      backgroundColor: courseColors[course._id] || "#4CAF50",
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
                      {course.name}
                    </h5>
                    <p className="card-text text-dark mb-1" style={{ fontSize: '13px' }}>
                      {course.number}
                    </p>
                    <p className="card-text text-muted" style={{ fontSize: '12px' }}>
                      {course.description}
                    </p>
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