"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  
  return (
    <div id="wd-assignments">
      <h2>Assignments</h2>
      <ul className="list-group mt-4">
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <li key={assignment._id} className="list-group-item">
              <Link 
                href={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                className="text-decoration-none"
              >
                <strong className="text-danger fs-5">{assignment.title}</strong>
              </Link>
              <p className="mb-1 mt-2">{assignment.description}</p>
              <small className="text-muted">
                <strong>Points:</strong> {assignment.points} | 
                <strong> Due:</strong> {new Date(assignment.dueDate).toLocaleDateString()} | 
                <strong> Available:</strong> {new Date(assignment.availableDate).toLocaleDateString()}
              </small>
            </li>
          ))}
      </ul>
    </div>
  );
}

