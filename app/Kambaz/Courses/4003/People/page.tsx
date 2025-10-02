"use client";

import { FaUserCircle } from "react-icons/fa";
import "./people.css";

export default function page() {
  const people = [
    {
      id: 1,
      name: "Tony Stark",
      loginId: "001234561S",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-01T00:00:00.000Z",
      totalActivity: "10:21:32"
    },
    {
      id: 2,
      name: "Bruce Wayne",
      loginId: "001234562S",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-11-02T00:00:00.000Z",
      totalActivity: "15:32:43"
    },
    {
      id: 3,
      name: "Steve Rogers",
      loginId: "001234563S",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-02T00:00:00.000Z",
      totalActivity: "23:32:43"
    },
    {
      id: 4,
      name: "Natasha Romanoff",
      loginId: "001234564S",
      section: "S101",
      role: "TA",
      lastActivity: "2020-11-05T00:00:00.000Z",
      totalActivity: "13:23:34"
    }
  ];

  return (
    <div className="people-container">
      <table className="people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td className="name-cell">
                <FaUserCircle className="user-icon" />
                <span className="user-name">{person.name}</span>
              </td>
              <td>{person.loginId}</td>
              <td>{person.section}</td>
              <td>{person.role}</td>
              <td>{person.lastActivity}</td>
              <td>{person.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}