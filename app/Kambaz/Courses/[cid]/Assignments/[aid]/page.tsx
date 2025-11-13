"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import * as coursesClient from "../../../client";
import * as assignmentsClient from "../client";
import { Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  const [assignment, setAssignment] = useState({
    _id: "",
    title: "New Assignment",
    course: cid,
    description: "New Assignment Description",
    points: 100,
    dueDate: "2024-05-13",
    availableDate: "2024-05-06",
    availableUntilDate: "2024-05-20",
  });

  const isNewAssignment = aid === "new";

  useEffect(() => {
    if (!isNewAssignment) {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [aid, assignments]);

  const handleSave = async () => {
    try {
      if (isNewAssignment) {
        // Create new assignment
        const newAssignment = await coursesClient.createAssignmentForCourse(
          cid as string,
          assignment
        );
        dispatch(addAssignment(newAssignment));
        alert("Assignment created successfully!");
      } else {
        // Update existing assignment
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
        alert("Assignment updated successfully!");
      }
      router.push(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment:", error);
      alert("Failed to save assignment");
    }
  };

  const handleCancel = () => {
    router.push(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <h3>{isNewAssignment ? "New Assignment" : "Edit Assignment"}</h3>
      
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          className="form-control"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">
          Description
        </label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="wd-available-from" className="form-label">
          Available from
        </label>
        <input
          id="wd-available-from"
          type="date"
          className="form-control"
          value={assignment.availableDate}
          onChange={(e) =>
            setAssignment({ ...assignment, availableDate: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-due-date" className="form-label">
          Due Date
        </label>
        <input
          id="wd-due-date"
          type="date"
          className="form-control"
          value={assignment.dueDate}
          onChange={(e) =>
            setAssignment({ ...assignment, dueDate: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-available-until" className="form-label">
          Available Until
        </label>
        <input
          id="wd-available-until"
          type="date"
          className="form-control"
          value={assignment.availableUntilDate}
          onChange={(e) =>
            setAssignment({ ...assignment, availableUntilDate: e.target.value })
          }
        />
      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave} id="wd-save-assignment">
          Save
        </Button>
      </div>
    </div>
  );
}