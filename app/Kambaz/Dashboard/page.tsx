import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />

      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/kambaz/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Kambaz/Courses/2001" className="wd-dashboard-course-link">
            <Image src="/images/node.jpg" width={200} height={150} alt="Node" />
            <div>
              <h5>CS2001 Node</h5>
              <p className="wd-dashboard-course-title">Server-side fundamentals</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link href="/Kambaz/Courses/3002" className="wd-dashboard-course-link">
            <Image src="/images/db.jpg" width={200} height={150} alt="Databases" />
            <div>
              <h5>CS3002 DB</h5>
              <p className="wd-dashboard-course-title">Databases</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Kambaz/Courses/4003" className="wd-dashboard-course-link">
            <Image src="/images/testing.jpg" width={200} height={150} alt="Testing" />
            <div>
              <h5>CS4003 Testing</h5>
              <p className="wd-dashboard-course-title">Testing & QA</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        
      </div>
    </div>
  );
}
