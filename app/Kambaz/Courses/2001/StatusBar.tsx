"use client";
import { FaBan, FaCheckCircle, FaFileImport, FaFileExport, FaCog, FaBullhorn, FaChartBar, FaBell, FaHome } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";
import "./StatusBar.css";

export default function StatusBar() {
  return (
    <div id="wd-course-status" className="course-status-bar">
      <h3 className="status-title">Course Status</h3>
      
      <div className="status-buttons">
        {/* Unpublish / Published Buttons */}
        <button className="status-btn status-btn-secondary">
          <FaBan /> Unpublish
        </button>
        <button className="status-btn status-btn-success">
          <FaCheckCircle /> Published
        </button>
      </div>

      <div className="status-actions">
        <button className="action-btn">
          <FaFileImport /> Import Existing Content
        </button>
        <button className="action-btn">
          <FaFileExport /> Import from Commons
        </button>
        <button className="action-btn">
          <FaHome /> Choose Home Page
        </button>
        <button className="action-btn">
          <MdOutlineBarChart /> View Course Stream
        </button>
        <button className="action-btn">
          <FaBullhorn /> New Announcement
        </button>
        <button className="action-btn">
          <FaChartBar /> New Analytics
        </button>
        <button className="action-btn">
          <FaBell /> View Course Notifications
        </button>
      </div>
    </div>
  );
}