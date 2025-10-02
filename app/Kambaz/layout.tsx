"use client";
import Navigation from "./Components/Navigation";
import "./kambaz.css";

export default function KambaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="kambaz-layout">
      {/* Main Navigation Sidebar (Left Side - Black Background) */}
      <Navigation />
      
      {/* Main Content Area */}
      <main className="kambaz-main">
        {children}
      </main>
    </div>
  );
}