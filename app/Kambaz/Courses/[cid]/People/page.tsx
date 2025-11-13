"use client"
import React from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import * as db from "../../../Database";
import { User, Enrollment } from "../../../Database/types"; 

export default function People() {
  const { cid } = useParams();
  const { users, enrollments } = db;
  
  return (
    <div id="wd-people">
      <h2>People</h2>
      <table className="table table-striped mt-4">
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
          {users
            .filter((usr: User) => 
              enrollments.some(
                (enrollment: Enrollment) => 
                  enrollment.user === usr._id && 
                  enrollment.course === cid
              )
            )
            .map((user: User) => ( 
              <tr key={user._id}>
                <td className="text-nowrap">
                  <FaUserCircle className="me-2 fs-3 text-secondary" />
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.loginId}</td>
                <td>{user.section}</td>
                <td>
                  <span className={`badge ${
                    user.role === 'FACULTY' ? 'bg-primary' : 'bg-success'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.lastActivity}</td>
                <td>{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}