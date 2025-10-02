import Link from "next/link";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFileImport } from "react-icons/fa";
import './dashboard.css';
export default function Dashboard() {
  const courses = [
    {
      id: "1234",
      code: "CS5610 SU1 24 MON/FRI",
      fullCode: "CS5610.41239.202440",
      name: "CS5610.41239.202440",
      description: "2024-06-3 Summer 1 2024 Semester Full Te...",
      image: "/images/reactjs.jpg",
      color: "#4CAF50", // Green
    },
    {
      id: "2001",
      code: "CS5610 SU23 WED",
      fullCode: "CS5610.52323.202420",
      name: "CS5610.52323.202420",
      description: "2024-06-3 Summer 1 2024 Semester Full Te...",
      image: "/images/node.jpg",
      color: "#4CAF50", // Green
    },
    {
      id: "3002",
      code: "CS5610 02 SP24 MON",
      fullCode: "CS5610.35159.202430",
      name: "CS5610.35159.202430",
      description: "2024-04-2 Spring 2024 Semester Full Te...",
      image: "/images/db.jpg",
      color: "#1976D2", // Blue
    },
    {
      id: "4003",
      code: "CS4550 01 SP24 TUE/FRI",
      fullCode: "CS4550.30085.202430",
      name: "CS4550.30085.202430",
      description: "2024-01-1 Spring 2024 Semester Full Term",
      image: "/images/testing.jpg",
      color: "#2196F3", // Light Blue
    },
  ];

  return (
    <div id="wd-dashboard" style={{ marginLeft: '120px' }}>
      <div className="container-fluid p-4">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>
        <hr />
        
        <h2 id="wd-dashboard-published" className="fs-5 mb-4">
          Published Courses (29)
        </h2>

        <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {courses.map((course) => (
            <div key={course.id} className="col">
              <div className="card wd-dashboard-course h-100">
                <Link 
                  href={`/Kambaz/Courses/${course.id}/Modules`} 
                  className="text-decoration-none"
                >
                  <div 
                    className="card-img-top position-relative" 
                    style={{ 
                      backgroundColor: course.color,
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
                      {course.code}
                    </h5>
                    <p className="card-text text-dark mb-1" style={{ fontSize: '13px' }}>
                      {course.fullCode}
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