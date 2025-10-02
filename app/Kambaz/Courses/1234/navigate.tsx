import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navigate.css";

export default function navigate() {
  const pathname = usePathname();
  
  const links = [
    { href: "/Kambaz/Courses/1234/Home", label: "Home", id: "wd-course-home-link" },
    { href: "/Kambaz/Courses/1234/Modules", label: "Modules", id: "wd-course-modules-link" },
    { href: "/Kambaz/Courses/1234/Piazza", label: "Piazza", id: "wd-course-piazza-link" },
    { href: "/Kambaz/Courses/1234/Zoom", label: "Zoom Meetings", id: "wd-course-zoom-link" },
    { href: "/Kambaz/Courses/1234/Assignments", label: "Assignments", id: "wd-course-assignments-link" },
    { href: "/Kambaz/Courses/1234/Quizzes", label: "Quizzes", id: "wd-course-quizzes-link" },
    { href: "/Kambaz/Courses/1234/Grades", label: "Grades", id: "wd-course-grades-link" },
    { href: "/Kambaz/Courses/1234/People", label: "People", id: "wd-course-people-link" },
    { href: "/Kambaz/Courses/1234/Settings", label: "Settings", id: "wd-course-settings-link" },
  ];

  return (
    <div id="wd-courses-navigation" className="course-nav-sidebar">
      <ul className="course-nav-list">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
          return (
            <li key={link.id} className={`course-nav-item ${isActive ? 'active' : ''}`}>
              <Link href={link.href} id={link.id} className="course-nav-link">
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}