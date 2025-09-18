"use client";
import Link from "next/link";

const CS3002Assignments = () => {
  const assignments = [
    { id: "A1", title: "React Basics Assignment", due: "2025-09-20", points: 100 },
    { id: "A2", title: "Components Assignment", due: "2025-09-25", points: 50 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assignments - CS4003 React JS</h2>
      <ul>
        {assignments.map((a) => (
          <li
            key={a.id}
            className="wd-assignment-list-item p-2 border rounded mb-2"
          >
            <Link href={`/Kambaz/Courses/CS4003/Assignments/${a.id}/Editor`}>
              {a.title}
            </Link>
            <span className="ml-4 text-gray-500">
              Due: {a.due} | {a.points} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CS3002Assignments;
