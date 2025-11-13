"use client";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Node.js",
    description: "Learn the basics of Node.js",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* Retrieving Objects */}
      <h4>Retrieving Objects</h4>
      <a
        href={`${ASSIGNMENT_API_URL}`}
        className="btn btn-primary mb-2"
        id="wd-retrieve-assignments"
        target="_blank"
      >
        Get Assignment
      </a>
      <hr />

      {/* Retrieving Properties */}
      <h4>Retrieving Properties</h4>
      <a
        href={`${ASSIGNMENT_API_URL}/title`}
        className="btn btn-primary mb-2"
        id="wd-retrieve-assignment-title"
        target="_blank"
      >
        Get Title
      </a>
      <hr />

      {/* Modifying Properties */}
      <h4>Modifying Properties</h4>
      <input
        type="text"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        className="form-control w-75 mb-2"
        id="wd-assignment-title"
      />
      <a
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        className="btn btn-primary mb-2 w-100"
        id="wd-update-assignment-title"
        target="_blank"
      >
        Update Title
      </a>
      <hr />

      {/* Module Operations */}
      <h4>Working with Module</h4>
      <a
        href={`${MODULE_API_URL}`}
        className="btn btn-primary mb-2"
        id="wd-retrieve-module"
        target="_blank"
      >
        Get Module
      </a>
      <a
        href={`${MODULE_API_URL}/name`}
        className="btn btn-primary mb-2 ms-2"
        id="wd-retrieve-module-name"
        target="_blank"
      >
        Get Module Name
      </a>
      <hr />

      <input
        type="text"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
        className="form-control w-75 mb-2"
        id="wd-module-name"
      />
      <a
        href={`${MODULE_API_URL}/name/${module.name}`}
        className="btn btn-primary mb-2 w-100"
        id="wd-update-module-name"
        target="_blank"
      >
        Update Module Name
      </a>
    </div>
  );
}