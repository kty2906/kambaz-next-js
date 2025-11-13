"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };

  const updateTitle = async (title: string) => {
    const updatedAssignment = await client.updateTitle(title);
    setAssignment(updatedAssignment);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      
      <input
        type="text"
        value={assignment.title || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        className="form-control mb-2"
        id="wd-async-assignment-title"
      />
      
      <textarea
        value={assignment.description || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
        className="form-control mb-2"
        rows={3}
        id="wd-async-assignment-description"
      />
      
      <input
        type="date"
        value={assignment.due || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
        className="form-control mb-2"
        id="wd-async-assignment-due"
      />
      
      <div className="form-check mb-2">
        <input
          type="checkbox"
          checked={assignment.completed || false}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
          className="form-check-input"
          id="wd-async-assignment-completed"
        />
        <label className="form-check-label" htmlFor="wd-async-assignment-completed">
          Completed
        </label>
      </div>
      
      <button
        onClick={() => updateTitle(assignment.title)}
        className="btn btn-primary mb-2"
        id="wd-async-update-title"
      >
        Update Title
      </button>
      
      <pre className="bg-light p-3 rounded">
        {JSON.stringify(assignment, null, 2)}
      </pre>
    </div>
  );
}
