"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Assignment } from "../../../Database/types";
import { KambazState } from "../../../store/types";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: KambazState) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const handleDeleteAssignment = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input 
          type="text" 
          className="form-control w-50"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
        />
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            + Group
          </Button>
          <Link href={`/Kambaz/Courses/${cid}/Assignments/new`}>
            <Button 
              variant="danger"
              id="wd-add-assignment"
            >
              <FaPlus className="me-2" />
              Assignment
            </Button>
          </Link>
        </div>
      </div>

      <h3 className="text-danger">ASSIGNMENTS</h3>
      
      <ul className="list-group">
        {assignments
          .filter((assignment: Assignment) => assignment.course === cid)
          .map((assignment: Assignment) => (
            <li 
              key={assignment._id} 
              className="list-group-item wd-assignment-list-item"
              style={{ borderLeft: '4px solid #0cab5a' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                  <Link 
                    href={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-decoration-none wd-assignment-link"
                  >
                    <strong className="text-danger fs-5">{assignment.title}</strong>
                  </Link>
                  <div className="mt-1">
                    <small className="text-muted">
                      <strong>Multiple Modules</strong> | Not available until {new Date(assignment.availableDate).toLocaleDateString()}
                    </small>
                  </div>
                  <div>
                    <small className="text-muted">
                      <strong>Due</strong> {new Date(assignment.dueDate).toLocaleDateString()} at 11:59pm | {assignment.points} pts
                    </small>
                  </div>
                </div>
                
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDeleteAssignment(assignment._id)}
                  id="wd-delete-assignment-click"
                >
                  <FaTrash />
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
