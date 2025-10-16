import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database";
import CoursesNavigation from "./Navigation";

export default async function CoursesLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ cid: string }> 
}) {
  const { cid } = await params;
  const course = courses.find((c) => c._id === cid);
  
  return (
    <div id="wd-courses" style={{ marginLeft: '120px', padding: '20px' }}>
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block" style={{ minWidth: '200px' }}>
          <CoursesNavigation />
        </div>
        <div className="flex-fill ps-4">
          {children}
        </div>
      </div>
    </div>
  );
}
