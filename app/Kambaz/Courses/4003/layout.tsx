"use client";
import { ReactNode } from "react";
import CourseNavigation from "./navigate";
import CourseStatusBar from "./StatusBar";
import "./layout.css";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-courses" className="course-layout">
      {/* Course Header */}
      <div className="course-header">
        <div className="course-header-left">
          <button className="hamburger-btn">☰</button>
          <h2 className="course-title">CS5610 SU1 24 MON/FRI</h2>
          <span className="course-breadcrumb"> &gt; Modules</span>
        </div>
        <div className="course-header-right">
          <button className="student-view-btn">👁 Student View</button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="course-content-grid">
        {/* Left Sidebar - Navigation */}
        <aside className="course-nav-column">
          <CourseNavigation />
        </aside>

        {/* Center - Main Content */}
        <main className="course-main-content">
          {children}
        </main>

        {/* Right Sidebar - Status Bar */}
        <aside className="course-status-column">
          <CourseStatusBar />
        </aside>
      </div>
    </div>
  );
}