"use client";
import { useParams, usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  
  const links = [
    "Home", 
    "Modules", 
    "Piazza", 
    "Zoom", 
    "Assignments", 
    "Quizzes", 
    "Grades", 
    "People"
  ];
  
  return (
    <ListGroup id="wd-courses-navigation" className="fs-5 rounded-0">
      {links.map((link) => (
        <ListGroupItem 
          key={link}
          as={Link}
          href={`/Kambaz/Courses/${cid}/${link}`}
          action
          className={`border-0 ${
            pathname.includes(link) ? "active text-black bg-light" : "text-danger"
          }`}
        >
          {link}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}