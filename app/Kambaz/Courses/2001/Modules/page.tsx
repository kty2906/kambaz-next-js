"use client";

import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle, FaEllipsisV, FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import "./Modules.css";

export default function CS1234Modules() {
  return (
    <div className="modules-container">
      {/* Action Buttons */}
      <div className="modules-actions">
        <button className="btn-secondary">Collapse All</button>
        <button className="btn-secondary">View Progress</button>
        <div className="publish-dropdown">
          <button className="btn-success">
            <FaCheckCircle /> Publish All
          </button>
        </div>
        <button className="btn-danger">+ Module</button>
        <button className="btn-icon">
          <FaEllipsisV />
        </button>
      </div>

      {/* Module 1 */}
      <div className="module">
        <div className="module-header">
          <div className="module-header-left">
            <BsGripVertical className="grip-icon" />
            <IoMdArrowDropdown className="arrow-icon" />
            <h3 className="module-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</h3>
          </div>
          <div className="module-header-right">
            <FaCheckCircle className="check-icon" />
            <FaPlus className="plus-icon" />
            <FaEllipsisV className="ellipsis-icon" />
          </div>
        </div>

        {/* Module Content */}
        <div className="module-content">
          {/* Learning Objectives Section */}
          <div className="module-item section-header">
            <div className="item-left">
              <BsGripVertical className="grip-icon-small" />
              <span className="item-title">LEARNING OBJECTIVES</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>

          {/* Learning Objective Items */}
          <div className="module-item">
            <div className="item-left indent">
              <BsGripVertical className="grip-icon-small" />
              <span className="item-title">Introduction to the course</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>

          <div className="module-item">
            <div className="item-left indent">
              <BsGripVertical className="grip-icon-small" />
              <span className="item-title">Learn what is Web Development</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>

          {/* Reading Section */}
          <div className="module-item section-header">
            <div className="item-left">
              <BsGripVertical className="grip-icon-small" />
              <span className="item-title">READING</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>

          {/* Reading Items */}
          <div className="module-item">
            <div className="item-left indent">
              <BsGripVertical className="grip-icon-small" />
              <span className="item-title">Full Stack Developer - Chapter 1 - Introduction</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>

          <div className="module-item">
            <div className="item-left indent">
              <BsGripVertical className="grip-icon-small" />
              <span className="item-title">Full Stack Developer - Chapter 2 - Creating User Interfaces With HTML</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>

          {/* Slides Section */}
          <div className="module-item section-header">
            <div className="item-left">
              <BsGripVertical className="grip-icon-small" />
              <span className="item-title">SLIDES</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>

          {/* Slide Item with Link */}
          <div className="module-item">
            <div className="item-left indent">
              <BsGripVertical className="grip-icon-small" />
              <MdOutlineEdit className="edit-icon" />
              <a href="#" className="item-link">Introduction to Web Development</a>
              <span className="external-icon">↗</span>
            </div>
            <div className="item-right">
              <FaCheckCircle className="check-icon-small" />
              <FaEllipsisV className="ellipsis-icon-small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}