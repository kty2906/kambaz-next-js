"use client";

import Link from "next/link";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import "./assignment.css";

const CS1234Assignments = () => {
  const assignments = [
    {
      id: "A1",
      title: "A1",
      description: "Multiple Modules",
      notAvailable: "May 6 at 12:00am",
      due: "May 13 at 11:59pm",
      points: 100,
    },
    {
      id: "A2",
      title: "A2",
      description: "Multiple Modules",
      notAvailable: "May 13 at 12:00am",
      due: "May 20 at 11:59pm",
      points: 100,
    },
    {
      id: "A3",
      title: "A3",
      description: "Multiple Modules",
      notAvailable: "May 20 at 12:00am",
      due: "May 27 at 11:59pm",
      points: 100,
    },
  ];

  return (
    <div className="assignments-container">
      {/* Action Bar */}
      <div className="assignments-actions">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
        <button className="btn-group">
          <FaPlus /> Group
        </button>
        <button className="btn-assignment">
          <FaPlus /> Assignment
        </button>
      </div>

      {/* Assignments List */}
      <div className="assignments-list">
        {/* Assignments Header */}
        <div className="assignments-header">
          <div className="header-left">
            <BsGripVertical className="grip-icon" />
            <IoMdArrowDropdown className="arrow-icon" />
            <h3 className="assignments-title">ASSIGNMENTS</h3>
          </div>
          <div className="header-right">
            <span className="assignments-weight">40% of Total</span>
            <FaPlus className="plus-icon" />
            <BsThreeDotsVertical className="dots-icon" />
          </div>
        </div>

        {/* Assignment Items */}
        <div className="assignments-items">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="assignment-item">
              <div className="item-left">
                <BsGripVertical className="grip-icon-small" />
                <MdOutlineAssignment className="assignment-icon" />
                <div className="assignment-details">
                  <Link
                    href={`/Kambaz/Courses/1234/Assignments/${assignment.id}`}
                    className="assignment-link"
                  >
                    {assignment.title}
                  </Link>
                  <div className="assignment-meta">
                    <span className="meta-text">{assignment.description}</span>
                    <span className="meta-separator">|</span>
                    <span className="meta-text">
                      <strong>Not available until</strong> {assignment.notAvailable}
                    </span>
                    <span className="meta-separator">|</span>
                    <span className="meta-text">
                      <strong>Due</strong> {assignment.due}
                    </span>
                    <span className="meta-separator">|</span>
                    <span className="meta-text">{assignment.points} pts</span>
                  </div>
                </div>
              </div>
              <div className="item-right">
                <FaCheckCircle className="check-icon" />
                <BsThreeDotsVertical className="dots-icon-small" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CS1234Assignments;