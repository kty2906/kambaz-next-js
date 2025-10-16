"use client"
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);
  
  if (!assignment) {
    return (
      <div className="alert alert-warning">
        Assignment not found
      </div>
    );
  }
  
  return (
    <div id="wd-assignment-editor">
      <h3>Assignment Editor</h3>
      
      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control 
            type="text" 
            defaultValue={assignment.title}
            id="wd-name"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5}
            defaultValue={assignment.description}
            id="wd-description"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control 
            type="number" 
            defaultValue={assignment.points}
            id="wd-points"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control 
            type="date" 
            defaultValue={assignment.dueDate}
            id="wd-due-date"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control 
            type="date" 
            defaultValue={assignment.availableDate}
            id="wd-available-from"
          />
        </Form.Group>
        
        <div className="d-flex gap-2 mt-4">
          <Link
            href={`/Kambaz/Courses/${cid}/Assignments`}
            passHref
            id="wd-cancel"
          >
            <Button variant="secondary">
            Cancel
            </Button>
          </Link>
          <Link
            href={`/Kambaz/Courses/${cid}/Assignments`}
            passHref
            id="wd-save"
          >
            <Button variant="danger">
            Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
