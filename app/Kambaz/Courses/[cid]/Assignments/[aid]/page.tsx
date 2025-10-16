"use client"
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, Form, Row, Col } from "react-bootstrap";
import * as db from "../../../../Database";
import { Assignment } from "../../../../Database/types"; // FIXED: Import type

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: Assignment) => a._id === aid); // FIXED: Use Assignment type
  
  if (!assignment) {
    return (
      <div className="alert alert-warning">
        Assignment not found
      </div>
    );
  }
  
  return (
    <div id="wd-assignment-editor" style={{ maxWidth: '800px' }}>
      <h3>Assignment Editor</h3>
      
      <Form className="mt-4">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Assignment Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control 
              type="text" 
              defaultValue={assignment.title}
              id="wd-name"
            />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Description
          </Form.Label>
          <Col sm={9}>
            <Form.Control 
              as="textarea" 
              rows={5}
              defaultValue={assignment.description}
              id="wd-description"
            />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control 
              type="number" 
              defaultValue={assignment.points}
              id="wd-points"
            />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-assignment-group">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-display-grade-as">
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
              <option>Complete/Incomplete</option>
            </Form.Select>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3 rounded">
              <Form.Select className="mb-3" id="wd-submission-type">
                <option>Online</option>
                <option>In Person</option>
                <option>External Tool</option>
              </Form.Select>
              
              <div>
                <strong>Online Entry Options</strong>
                <Form.Check 
                  type="checkbox" 
                  label="Text Entry" 
                  id="wd-text-entry"
                />
                <Form.Check 
                  type="checkbox" 
                  label="Website URL" 
                  id="wd-website-url"
                />
                <Form.Check 
                  type="checkbox" 
                  label="Media Recordings" 
                  id="wd-media-recordings"
                />
                <Form.Check 
                  type="checkbox" 
                  label="File Uploads" 
                  id="wd-file-uploads"
                />
              </div>
            </div>
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3 rounded">
              <Form.Group className="mb-3">
                <Form.Label>Assign to</Form.Label>
                <Form.Control 
                  type="text" 
                  defaultValue="Everyone"
                  id="wd-assign-to"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control 
                  type="date" 
                  defaultValue={assignment.dueDate}
                  id="wd-due-date"
                />
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control 
                      type="date" 
                      defaultValue={assignment.availableDate}
                      id="wd-available-from"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control 
                      type="date" 
                      defaultValue={assignment.dueDate}
                      id="wd-available-until"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>
        
        <div className="d-flex justify-content-end gap-2 mt-4 border-top pt-3">
  <Link href={`/Kambaz/Courses/${cid}/Assignments`} passHref legacyBehavior>
    <Button variant="secondary" id="wd-cancel">
      Cancel
    </Button>
  </Link>
  <Link href={`/Kambaz/Courses/${cid}/Assignments`} passHref legacyBehavior>
    <Button variant="danger" id="wd-save">
      Save
    </Button>
  </Link>
</div>
      </Form>
    </div>
  );
}
