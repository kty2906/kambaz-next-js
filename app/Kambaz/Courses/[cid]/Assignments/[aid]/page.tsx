"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { Assignment } from "../../../../Database/types";

export default function AssignmentEditor() {
  const router = useRouter();
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  
  // Find existing assignment or create new one
  const existingAssignment = aid !== "new" 
    ? assignments.find((a: Assignment) => a._id === aid)
    : null;
  
  const [assignment, setAssignment] = useState<Assignment>(
    existingAssignment || {
      _id: "new",
      title: "New Assignment",
      course: cid as string,
      description: "New Assignment Description",
      points: 100,
      dueDate: new Date().toISOString().split('T')[0],
      availableDate: new Date().toISOString().split('T')[0],
    }
  );

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [aid]);

  // SAVE HANDLER - Creates new or updates existing
  const handleSave = () => {
    if (aid === "new") {
      // CREATE NEW ASSIGNMENT
      dispatch(addAssignment({ ...assignment, course: cid }));
    } else {
      // UPDATE EXISTING ASSIGNMENT
      dispatch(updateAssignment(assignment));
    }
    // Navigate back to assignments list
    router.push(`/Kambaz/Courses/${cid}/Assignments`);
  };

  // CANCEL HANDLER
  const handleCancel = () => {
    router.push(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="container" style={{ maxWidth: '900px' }}>
      <h3>Assignment Editor</h3>
      
      <Form className="mt-4">
        {/* Assignment Name */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Assignment Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control 
              type="text" 
              value={assignment.title}
              onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
              id="wd-name"
            />
          </Col>
        </Form.Group>
        
        {/* Description */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Description
          </Form.Label>
          <Col sm={9}>
            <Form.Control 
              as="textarea" 
              rows={5}
              value={assignment.description}
              onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
              id="wd-description"
            />
          </Col>
        </Form.Group>
        
        {/* Points */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control 
              type="number" 
              value={assignment.points}
              onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
              id="wd-points"
            />
          </Col>
        </Form.Group>
        
        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-assignment-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>
        
        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter Grade">Letter Grade</option>
              <option value="Complete/Incomplete">Complete/Incomplete</option>
            </Form.Select>
          </Col>
        </Form.Group>
        
        {/* Submission Type */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3 rounded">
              <Form.Select className="mb-3" id="wd-submission-type">
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
                <option value="External Tool">External Tool</option>
              </Form.Select>
              
              <div>
                <strong className="d-block mb-2">Online Entry Options</strong>
                <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
                <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
                <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
                <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
                <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
              </div>
            </div>
          </Col>
        </Form.Group>
        
        {/* Assign Section */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3 rounded">
              {/* Assign To */}
              <Form.Group className="mb-3">
                <Form.Label><strong>Assign to</strong></Form.Label>
                <Form.Control 
                  type="text" 
                  defaultValue="Everyone"
                  id="wd-assign-to"
                />
              </Form.Group>
              
              {/* Due Date */}
              <Form.Group className="mb-3">
                <Form.Label><strong>Due</strong></Form.Label>
                <Form.Control 
                  type="date" 
                  value={assignment.dueDate}
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                  id="wd-due-date"
                />
              </Form.Group>
              
              {/* Available From and Until */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Available from</strong></Form.Label>
                    <Form.Control 
                      type="date" 
                      value={assignment.availableDate}
                      onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
                      id="wd-available-from"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Until</strong></Form.Label>
                    <Form.Control 
                      type="date" 
                      value={assignment.dueDate}
                      onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                      id="wd-available-until"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>
        
        {/* Buttons */}
        <hr />
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button 
            variant="secondary"
            onClick={handleCancel}
            id="wd-cancel"
          >
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={handleSave}
            id="wd-save"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
