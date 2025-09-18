// app/(Kambaz)/Courses/2001/Assignments/page.tsx
import React from "react";

export default function Course2001Assignments() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <ul className="wd-assignment-list pl-6">
        <li className="wd-assignment-list-item">Assignment 1: Node Basics</li>
        <li className="wd-assignment-list-item">Assignment 2: Express Server</li>
      </ul>
    </div>
  );
}
