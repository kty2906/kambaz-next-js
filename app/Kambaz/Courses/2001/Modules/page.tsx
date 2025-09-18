// app/(Kambaz)/Courses/2001/Modules/page.tsx
import React from "react";

export default function Course2001Modules() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modules</h1>
      <ul className="list-disc pl-6">
        <li>
          Week 1 – Intro to Node
          <ul className="list-disc pl-6">
            <li><a href="#">Reading: Node Basics</a></li>
            <li><a href="#">Slides: Server Setup</a></li>
          </ul>
        </li>
        <li>
          Week 2 – Express.js
          <ul className="list-disc pl-6">
            <li><a href="#">Reading: Express Routing</a></li>
            <li><a href="#">Slides: Middleware</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
